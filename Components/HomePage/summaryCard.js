import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getData } from "../Utils/localStorageFunctions";
import { calculateNutrition, convertToDateString } from "../Utils/commonFunctions";
import DonutGraph from "./donutGraph";


export default function SummaryCard({ totalNutrition, goals, percentage }) {

    const colorsObj = {
        calorie: '#FF9800', //Orange
        protein: '#FF5722', //Reddish-Orange
        carbs: '#2196F3',   //Blue
        fat: '#795548',     //Brown
        fiber: '#4CAF50',   //Green
        sugar: '#9C27B0'    //Purple
    }

    const trackedSummaryView = (name, id) => {
        const consumed = totalNutrition[id];
        const goal = goals[id];
        const percent = percentage[id];
        return (
            <View style={styles.trackedCard}>
                <View style={styles.graphSection}>
                    <DonutGraph color={colorsObj[id]} percent={percent} />
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.titleText}>{name}</Text>
                    <Text style={styles.nutritionText}>{consumed}/{goal}</Text>
                </View>
            </View>
        )
    }
    const untrackedSummaryView = (name, consumed) => {
        return (
            <View>
                <Text>{name}: {consumed}</Text>
            </View>
        )
    }
    const NutritionCardView = (title, id) => {
        return (
            <View>
                {percentage[id] === "" ? untrackedSummaryView(title, totalNutrition[id]) : trackedSummaryView(title, id)}
            </View>
        )
    }

    return (
        <View style={styles.summaryCardContainer}>
            <View style={styles.row}>
                <View style={styles.column}>
                    {NutritionCardView("Calorie", "calorie")}
                </View>
                <View style={styles.column}>
                    {NutritionCardView("Protein", "protein")}
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    {NutritionCardView("Carbs", "carbs")}
                </View>
                <View style={styles.column}>
                    {NutritionCardView("Fat", "fat")}
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    {NutritionCardView("Fiber", "fiber")}
                </View>
                <View style={styles.column}>
                    {NutritionCardView("Sugar", "sugar")}
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    summaryCardContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    column: {
        flex: 1,
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red'
    },
    trackedCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    graphSection: {
        marginRight: 10, // Add some margin between graph and text
    },
    textSection: {
        flex: 1, // Take remaining width
        // alignItems: 'center',
        // backgroundColor: 'aqua'
    },
    titleText: {
        fontWeight: 'bold'
    },
    nutritionText: {
        fontStyle: 'italic'
    }
});
