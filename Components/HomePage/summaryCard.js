import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getData } from "../Utils/localStorageFunctions";
import { calculateNutrition, convertToDateString } from "../Utils/commonFunctions";
import DonutGraph from "./donutGraph";
import IconComponent from "./iconComponent";
import { nutrtionColorsObj } from "../Utils/colors";


export default function SummaryCard({ totalNutrition, goals, percentage }) {

    const trackedSummaryView = (name, id) => {
        const consumed = totalNutrition[id];
        const goal = goals[id];
        const percent = percentage[id];
        return (
            <View style={styles.trackedCard}>
                <View style={styles.graphSection}>
                    <DonutGraph color={nutrtionColorsObj[id]} percent={percent} />
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.titleText}>{name}</Text>
                    <Text style={styles.nutritionText}>{consumed}{id==='calorie'?'':'g'}/{goal}{id==='calorie'?'':'g'}</Text>
                </View>
            </View>
        )
    }
    const untrackedSummaryView = (name, id) => {
        const consumed = totalNutrition[id];
        return (
            <View style={styles.trackedCard}>
                <View style={[styles.iconSection,{backgroundColor: nutrtionColorsObj[id]}]}>
                    <IconComponent id={id} />
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.titleText}>{name}</Text>
                    <Text style={styles.nutritionText}>{consumed}{id==='calorie'?'':'g'}</Text>
                </View>
            </View>
        )
    }
    const NutritionCardView = (title, id) => {
        return (
            <View>
                {percentage[id] === "" ? untrackedSummaryView(title, id) : trackedSummaryView(title, id)}
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
        marginVertical: 5,
    },
    column: {
        flex: 1,
        paddingVertical: 5,
        // backgroundColor: 'aqua'
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red'
    },
    trackedCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    graphSection: {
        marginRight: 10, // Add some margin between graph and text
    },
    iconSection: {
        marginRight: 10, // Add some margin between graph and text
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 30
    },
    textSection: {
        flex: 1, // Take remaining width
        // alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold'
    },
    nutritionText: {
        fontStyle: 'italic'
    }
});
