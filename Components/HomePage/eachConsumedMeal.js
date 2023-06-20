import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import colors from '../Utils/colors';
import OptionsMenu from "react-native-options-menu";
import { deleteAConsumedMeal } from '../Utils/localStorageFunctions';

export default function EachConsumedMeal({ meal, mealInfo, updateComponent }) {

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const optionsIcon = (<SimpleLineIcons name='options-vertical' size={17} color={colors.primaryColor} />)

    if (!meal || !mealInfo) {
        // Render nothing if either meal or mealInfo is undefined
        return null;
    }

    const handleEditMeal = () => {

    }

    const handleDeleteMeal = () => {
        deleteAConsumedMeal(meal)
        updateComponent('delete',meal)
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
                                <Text>  ~ {meal.quantity}</Text>
                                <Text> {mealInfo.measureType}</Text>
                            </Text>
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.editContainer}>
                    <OptionsMenu
                        customButton={optionsIcon}
                        buttonStyle={{padding: 15}}
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
                    <Text style={styles.nutritionItem}>Calorie    :  {mealInfo.nutrition.calorie}</Text>
                    <Text style={styles.nutritionItem}>Protein    :  {mealInfo.nutrition.protein} g</Text>
                    <Text style={styles.nutritionItem}>Carbs      :  {mealInfo.nutrition.carbs} g</Text>
                    <Text style={styles.nutritionItem}>Fat           :  {mealInfo.nutrition.fat} g</Text>
                    <Text style={styles.nutritionItem}>Fiber        :  {mealInfo.nutrition.fiber} g</Text>
                    <Text style={styles.nutritionItem}>Sugar      :  {mealInfo.nutrition.sugar} g</Text>
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
    }



    // arrowContainer: {
    //     marginRight: 8,
    // },
    // arrow: {
    //     fontSize: 20,
    // },
    // nameContainer: {
    //     flex: 1,
    // },
    // name: {
    //     fontSize: 16,
    // },
    // editButton: {
    //     marginLeft: 8,
    //     paddingHorizontal: 8,
    //     paddingVertical: 4,
    //     backgroundColor: '#e0e0e0',
    //     borderRadius: 4,
    // },
    // editText: {
    //     fontSize: 14,
    //     fontWeight: 'bold',
    //     color: 'black',
    // },
    // detailsContainer: {
    //     marginTop: 8,
    //     paddingHorizontal: 16,
    // },
});

