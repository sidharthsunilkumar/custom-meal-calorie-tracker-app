import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import colors from '../Utils/colors';
import OptionsMenu from "react-native-options-menu";
import { deleteAConsumedMeal, editAConsumedMeal } from '../Utils/localStorageFunctions';

export default function EachConsumedMeal({ meal, mealInfo, setMeals }) {

    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [quantity, setQuantity] = useState(meal.quantity);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const optionsIcon = (<SimpleLineIcons name='options-vertical' size={17} color={colors.primaryColor} />)

    if (!meal || !mealInfo) {
        // Render nothing if either meal or mealInfo is undefined
        return null;
    }

    const handleEditMeal = () => {
        setEditMode(true)
        setShowDetails(true)
    }
    const handleDeleteMeal = () => {
        deleteAConsumedMeal(meal)
        setMeals(prevMeals => prevMeals.filter(m => m.id !== meal.id));
    }

    const handleSaveEdit = () => {
        let editedMeal = meal
        editedMeal.quantity = quantity
        editAConsumedMeal(editedMeal)
        setEditMode(false)
        setMeals(prev => prev.map(meal => meal.id === editedMeal.id ? editedMeal : meal));

    }
    const handleCancelEdit = () => {
        setQuantity(meal.quantity)
        setEditMode(false)
    }

    const calculateNutrition = (nutrition) => {
        let newNutrition = nutrition * quantity / mealInfo.quantity;
        if (newNutrition % 1 !== 0) {
            newNutrition = parseFloat(newNutrition.toFixed(2));
        } else {
            newNutrition = parseInt(newNutrition);
        }
        return newNutrition;
    }

    return (
        <View>
            <View style={styles.rowContainer}>

                <TouchableOpacity onPress={toggleDetails} style={styles.mealTitleContainer}>
                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}><AntDesign name={showDetails ? 'down' : 'right'} size={20} color={colors.primaryColor} /> </Text>
                    </View>
                    <View style={styles.mealTitle}>
                        <Text style={styles.mealNameText}>
                            <Text>{mealInfo.name}</Text>
                            <Text style={styles.mealQuantityText}>
                                <Text>  ~ {quantity}</Text>
                                <Text> {mealInfo.measureType}</Text>
                            </Text>
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.editContainer}>
                    <OptionsMenu
                        customButton={optionsIcon}
                        buttonStyle={{ padding: 15 }}
                        destructiveIndex={1}
                        options={["Edit", "Delete"]}
                        actions={[handleEditMeal, handleDeleteMeal]}
                    />
                </View>


            </View>
            {showDetails && (
                <View style={styles.detailsContainer}>
                    {mealInfo.description && (
                        <Text style={styles.description}>{mealInfo.description}</Text>
                    )}
                    <View style={styles.subheadingContainer}>
                        <Text style={styles.subheading}>Nutrition Info</Text>
                        <View style={styles.underline}></View>
                    </View>
                    <Text style={styles.nutritionItem}>Calorie    :  {calculateNutrition(mealInfo.nutrition.calorie)}</Text>
                    <Text style={styles.nutritionItem}>Protein    :  {calculateNutrition(mealInfo.nutrition.protein)} g</Text>
                    <Text style={styles.nutritionItem}>Carbs      :  {calculateNutrition(mealInfo.nutrition.carbs)} g</Text>
                    <Text style={styles.nutritionItem}>Fat           :  {calculateNutrition(mealInfo.nutrition.fat)} g</Text>
                    <Text style={styles.nutritionItem}>Fiber        :  {calculateNutrition(mealInfo.nutrition.fiber)} g</Text>
                    <Text style={styles.nutritionItem}>Sugar      :  {calculateNutrition(mealInfo.nutrition.sugar)} g</Text>
                    {editMode && (
                        <View>
                            <View style={styles.subheadingContainer}>
                                <Text style={styles.subheading}>Edit quantity</Text>
                                <View style={styles.underline}></View>
                            </View>
                            <View style={styles.quantityAndButtonContainer}>
                                <View style={styles.quantityContainer}>
                                    <TextInput
                                        style={styles.quantityInput}
                                        placeholder="Enter"
                                        keyboardType="numeric"
                                        value={quantity}
                                        onChangeText={setQuantity}
                                    />
                                    <Text style={styles.measurementText}>{mealInfo.measureType}</Text>
                                </View>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cancelButtonContainer}>
                                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                                    <Text style={styles.cancelButtonText}>Cancel Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    mealTitleContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    editContainer: {
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    detailsContainer: {
        backgroundColor: 'blue',
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#ccc',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10
    },
    mealNameText: {
        fontSize: 16,
    },
    mealQuantityText: {
        fontSize: 14,
        color: '#757575'
    },
    description: {
        fontStyle: 'italic',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    subheadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3
    },
    subheading: {
        fontWeight: 'bold',
    },
    underline: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
        marginLeft: 8,
    },
    nutritionItem: {
        paddingHorizontal: 15,
        marginVertical: 3
    },
    quantityAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityInput: {
        height: 40,
        width: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    measurementText: {
        fontStyle: 'italic',
        marginLeft: 10,
        fontSize: 15
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: colors.primaryColorLighter,
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    cancelButton: {
        width: 300,
        paddingVertical: 8,
        borderRadius: 10,
        borderColor: colors.primaryColorLighter,
        borderWidth: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    cancelButtonText: {
        color: colors.primaryColorLighter,
        fontWeight: 700,
    }
});

