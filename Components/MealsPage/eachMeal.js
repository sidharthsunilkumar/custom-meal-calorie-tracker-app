import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import colors from '../Utils/colors';

export default function EachMeal({ meal, activateEdit }) {

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <View>
            <View style={styles.rowContainer}>

                <TouchableOpacity onPress={toggleDetails} style={styles.mealTitleContainer}>
                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}><AntDesign name={showDetails ? 'down' : 'right'} size={20} color={colors.primaryColor} /> </Text>
                    </View>
                    <View style={styles.mealTitle}>
                        <Text>{meal.name}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>activateEdit(meal)} size={20} style={styles.editContainer}>
                    <Feather name='edit' size={16} color={colors.primaryColor} />
                </TouchableOpacity>


            </View>
            {showDetails && (
                <View style={styles.detailsContainer}>
                    {meal.description && (
                        <Text style={styles.description}>{meal.description}</Text>
                    )}
                    <View style={styles.subheadingContainer}>
                        <Text style={styles.subheading}>Nutrition for {meal.quantity} {meal.measureType}</Text>
                        <View style={styles.underline}></View>
                    </View>
                    <Text style={styles.nutritionItem}>Calorie    :  {meal.nutrition.calorie}</Text>
                    <Text style={styles.nutritionItem}>Protein    :  {meal.nutrition.protein} g</Text>
                    <Text style={styles.nutritionItem}>Carbs      :  {meal.nutrition.carbs} g</Text>
                    <Text style={styles.nutritionItem}>Fat           :  {meal.nutrition.fat} g</Text>
                    <Text style={styles.nutritionItem}>Fiber        :  {meal.nutrition.fiber} g</Text>
                    <Text style={styles.nutritionItem}>Sugar      :  {meal.nutrition.sugar} g</Text>
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

