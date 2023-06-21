import { useEffect, useState } from "react";
import { convertToDateString } from "../Utils/commonFunctions";
import { getData } from "../Utils/localStorageFunctions";
import EachConsumedMeal from "./eachConsumedMeal";
import { StyleSheet, View, Text } from "react-native";
import colors from "../Utils/colors";


export default function ConsumedMeals({ meals, setMeals, allMeals }) {

    const getMealInfo = (id) => {
        const filteredMeal = allMeals.filter((meal) => meal.id == id)[0];
        return filteredMeal;
    }

    return (
        <View style={styles.mealsContainer}>
            {meals.length > 0 ? (
                meals.map((meal) => <EachConsumedMeal key={meal.id} meal={meal} mealInfo={getMealInfo(meal.mealId)} setMeals={setMeals} />)
            ) : (
                <View style={styles.emptyTextContainer}>
                    <Text style={styles.emptyText}>You haven't added any meals!</Text>
                </View>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    mealsContainer: {
        paddingBottom: 15
    },
    emptyTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150
    },
    emptyText: {
        textAlign: "center",
        fontSize: 17,
        color: 'gray'
    },
})