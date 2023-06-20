import { useEffect, useState } from "react";
import { convertToDateString } from "../Utils/commonFunctions";
import { getData } from "../Utils/localStorageFunctions";
import EachConsumedMeal from "./eachConsumedMeal";
import { StyleSheet, View, Text } from "react-native";
import colors from "../Utils/colors";


export default function ConsumedMeals({ currentDate }) {

    const [meals, setMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);

    useEffect(() => {
        console.log('getting called')
        getData("myConsumedMeals_" + convertToDateString(currentDate)).then((data) => {
            console.log(data)
            if (data && data.length > 0) {
                setMeals(data);
            }
        })
        getData('meals').then((data) => {
            setAllMeals(data)
        })
    }, []);

    const updateComponent = (type, meal) => {
        if(type === 'delete'){
            setMeals(prevMeals => prevMeals.filter(m => m.id !== meal.id));
        }
    }

    const getMealInfo = (id) => {
        const filteredMeal = allMeals.filter((meal) => meal.id == id)[0];
        return filteredMeal;
    }

    return (
        <View style={styles.mealsContainer}>
            {meals.length > 0 ? (
                meals.map((meal) => <EachConsumedMeal key={meal.id} meal={meal} mealInfo={getMealInfo(meal.mealId)} updateComponent={updateComponent} />)
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