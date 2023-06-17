import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import colors from '../Utils/colors';

export default function EachMealInSearchPage({ meal, currentDate }) {

    const [showDetails, setShowDetails] = useState(false);
    const [quantity, setQuantity] = useState(meal.quantity);

    const handleAdd = () => {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        let date = currentDate.getDate();

        let currentDateStr = `${year}-${month}-${date}`;
        let data = {
            mealId: meal.id,
            quantity: quantity,
            currentDate: currentDateStr
        }
        console.log(data);
        setShowDetails(false)
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const calculateNutrition = (nutrition) => {
        let newNutrition = nutrition * quantity / meal.quantity;
        if (newNutrition % 1 !== 0) {
            newNutrition = parseFloat(newNutrition.toFixed(2));
        } else {
            newNutrition = parseInt(newNutrition);
        }
        return newNutrition;
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleDetails} style={styles.rowContainer}>

                <View style={styles.mealTitleContainer}>
                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}><AntDesign name={showDetails ? 'down' : 'right'} size={20} color={colors.primaryColor} /> </Text>
                    </View>
                    <View style={styles.mealTitle}>
                        <Text>{meal.name}</Text>
                    </View>
                </View>

                {/* <TouchableOpacity onPress={()=>activateEdit(meal)} size={20} style={styles.editContainer}>
                    <Feather name='edit' size={16} color={colors.primaryColor} />
                </TouchableOpacity> */}


            </TouchableOpacity>
            {showDetails && (
                <View style={styles.detailsContainer}>
                    {meal.description && (
                        <Text style={styles.description}>{meal.description}</Text>
                    )}
                    <View style={styles.subheadingContainer}>
                        <Text style={styles.subheading}>Nutrition Info</Text>
                        <View style={styles.underline}></View>
                    </View>
                    <Text style={styles.nutritionItem}>Calorie    :  {calculateNutrition(meal.nutrition.calorie)}</Text>
                    <Text style={styles.nutritionItem}>Protein    :  {calculateNutrition(meal.nutrition.protein)} g</Text>
                    <Text style={styles.nutritionItem}>Carbs      :  {calculateNutrition(meal.nutrition.carbs)} g</Text>
                    <Text style={styles.nutritionItem}>Fat           :  {calculateNutrition(meal.nutrition.fat)} g</Text>
                    <Text style={styles.nutritionItem}>Fiber        :  {calculateNutrition(meal.nutrition.fiber)} g</Text>
                    <Text style={styles.nutritionItem}>Sugar      :  {calculateNutrition(meal.nutrition.sugar)} g</Text>
                    <View style={styles.subheadingContainer}>
                        <Text style={styles.subheading}>Enter quantity</Text>
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
                            <Text style={styles.measurementText}>{meal.measureType}</Text></View>
                        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: 12,
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
    addButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: colors.primaryColorLighter,
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }


});

