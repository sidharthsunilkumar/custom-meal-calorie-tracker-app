import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import colors from '../Utils/colors';

export default function EachMeal({ meal, editHandler }) {

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

                <TouchableOpacity onPress={editHandler} size={20} style={styles.editContainer}>
                    <Feather name='edit' size={16} color={colors.primaryColor} />
                </TouchableOpacity>


            </View>
            {showDetails && (
                <View style={styles.detailsContainer}>
                    {meal.description && (
                        <Text>Description: {meal.description}</Text>
                    )}
                    <Text>Quantity: {meal.quantity}</Text>
                    <Text>Nutrition:</Text>
                    <Text>Calorie: {meal.nutrition.calorie}</Text>
                    <Text>Fat: {meal.nutrition.fat}</Text>
                    <Text>Fiber: {meal.nutrition.fiber}</Text>
                    <Text>Protein: {meal.nutrition.protein}</Text>
                    <Text>Sugar: {meal.nutrition.sugar}</Text>
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

