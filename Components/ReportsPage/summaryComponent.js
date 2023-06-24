import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getData } from "../Utils/localStorageFunctions";
import { calculateConsumedPercentage, calculateNutrition, convertToDateString } from "../Utils/commonFunctions";
import { nutrtionColorsObj } from "../Utils/colors";
import IconComponent from "../HomePage/iconComponent";
import DonutGraph from "../HomePage/donutGraph";
import Checkbox from "../Utils/checkbox";

export default function SummaryComponent({ setIsLoading, consumedList }) {

    const noOfDays = Object.keys(consumedList).length;
    const nutrients = [
        { name: "calorie", title: "Calorie" },
        { name: "protein", title: "Protein" },
        { name: "carbs", title: "Carbs" },
        { name: "fat", title: "Fat" },
        { name: "fiber", title: "Fiber" },
        { name: "sugar", title: "Sugar" }
    ];

    const [allMeals, setAllMeals] = useState(null);

    const [goals, setGoals] = useState({
        calorie: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        sugar: ""
    });

    const [totalNutrition, setTotalNutrition] = useState(null);

    const [averageNutrition, setAverageNutrition] = useState({
        calorie: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        sugar: ""
    });

    const [noOfEmptyDays, setNoOfEmptyDays] = useState(null);

    const [isEmptyChecked, setIsEmptyChecked] = useState(false);

    useEffect(() => {
        getData('goals').then((data) => {
            if (data) {
                setGoals({
                    calorie: data.calorie,
                    protein: data.protein,
                    carbs: data.carbs,
                    fat: data.fat,
                    fiber: data.fiber,
                    sugar: data.sugar
                })
            }
        }).catch((error) => {
            console.log(error);
        })
        getData('meals').then((data) => {
            if (data) {
                setAllMeals(data)
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        if (consumedList && allMeals) {
            setIsLoading(true)
            const consumedListWithNutrition = mergeToAllMeals(consumedList);
            const [totalNutrition, emptyDays] = calculateTotalNutrition(consumedListWithNutrition);
            setTotalNutrition(totalNutrition);
            setNoOfEmptyDays(emptyDays);
            calculateAverageNutrition(totalNutrition, noOfDays)
            setIsLoading(false)
        }
    }, [consumedList, allMeals, goals]);

    const mergeToAllMeals = (consumedList) => {
        let newObj = {}
        for (let key in consumedList) {
            if (consumedList[key]) {
                let mealsOfDayList = []
                consumedList[key].forEach(element => {
                    let nutrition = calculateAllNutrition(element['mealId'], element['quantity'])
                    mealsOfDayList.push({ ...element, nutrition })
                });
                newObj[key] = mealsOfDayList;
            } else {
                newObj[key] = null
            }
        }
        return newObj;
    }

    const calculateAllNutrition = (mealId, consumedQuantity) => {
        const mealInfo = getMealInfo(mealId);
        let nutrition = {
            calorie: calculateNutrition(mealInfo['nutrition']['calorie'], consumedQuantity, mealInfo['quantity']) || 0,
            protein: calculateNutrition(mealInfo['nutrition']['protein'], consumedQuantity, mealInfo['quantity']) || 0,
            carbs: calculateNutrition(mealInfo['nutrition']['carbs'], consumedQuantity, mealInfo['quantity']) || 0,
            fat: calculateNutrition(mealInfo['nutrition']['fat'], consumedQuantity, mealInfo['quantity']) || 0,
            fiber: calculateNutrition(mealInfo['nutrition']['fiber'], consumedQuantity, mealInfo['quantity']) || 0,
            sugar: calculateNutrition(mealInfo['nutrition']['sugar'], consumedQuantity, mealInfo['quantity']) || 0
        }
        return nutrition;
    }

    const getMealInfo = (id) => {
        const filteredMeal = allMeals.filter((meal) => meal.id == id)[0];
        return filteredMeal;
    }

    const calculateTotalNutrition = (consumedList) => {
        let emptyDays = 0;
        let totalNutrition = {
            calorie: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0
        }
        for (let key in consumedList) {
            if (consumedList[key]) {
                consumedList[key].forEach(element => {
                    for (let nutrient in totalNutrition) {
                        totalNutrition[nutrient] += element['nutrition'][nutrient];
                    }
                });
            } else {
                emptyDays += 1;
            }
        }
        return [totalNutrition, emptyDays];
    }

    const calculateAverageNutrition = (totalNutrition, noOfDays) => {
        let avgNutrition = {
            calorie: Math.floor(totalNutrition.calorie / noOfDays),
            protein: Math.floor(totalNutrition.protein / noOfDays),
            carbs: Math.floor(totalNutrition.carbs / noOfDays),
            fat: Math.floor(totalNutrition.fat / noOfDays),
            fiber: Math.floor(totalNutrition.fiber / noOfDays),
            sugar: Math.floor(totalNutrition.sugar / noOfDays)
        }
        setAverageNutrition(avgNutrition)
    }

    const handleExcludeCheck = () => {
        if (isEmptyChecked) {
            calculateAverageNutrition(totalNutrition, noOfDays)
            setIsEmptyChecked(false);
        } else {
            calculateAverageNutrition(totalNutrition, noOfDays - noOfEmptyDays)
            setIsEmptyChecked(true)
        }

    }

    const cardWithoutGoal = (name, title) => {
        return (
            <View style={styles.cardContainer} key={name}>
                <View style={[styles.iconContainer, { backgroundColor: nutrtionColorsObj[name] }]}>
                    <IconComponent id={name} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.avgContainer}><Text style={styles.infoTitleText}>Average</Text></View>
                        <View style={styles.goalContainer}><Text style={styles.infoTitleText}>My Goal</Text></View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.avgContainer}><Text style={styles.infoText}>{averageNutrition[name] || 0}{name === 'calorie' ? '' : 'g'}</Text></View>
                        <View style={styles.goalContainer}><Text style={styles.infoText}>Not set</Text></View>
                    </View>
                </View>
            </View>
        )
    }

    const cardWithGoal = (name, title) => {
        return (
            <View style={styles.cardContainer} key={name}>
                <View style={[styles.graphContainer]}>
                    <DonutGraph color={nutrtionColorsObj[name]} percent={calculateConsumedPercentage(averageNutrition[name], goals[name])} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.avgContainer}><Text style={styles.infoTitleText}>Average</Text></View>
                        <View style={styles.goalContainer}><Text style={styles.infoTitleText}>My Goal</Text></View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.avgContainer}><Text style={styles.infoText}>{averageNutrition[name] || 0}{name === 'calorie' ? '' : 'g'}</Text></View>
                        <View style={styles.goalContainer}><Text style={styles.infoText}>{goals[name]}{name === 'calorie' ? '' : 'g'}</Text></View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.summaryComponentContainer}>
            {noOfEmptyDays > 0 && (
                <View style={styles.excludeCheckContainer}>
                    <Text style={styles.excludeText}>Consider the {noOfEmptyDays} empty day{noOfEmptyDays != 1 ? 's' : ''} ?</Text>
                    <Checkbox isChecked={isEmptyChecked} toggleFn={() => { handleExcludeCheck() }} />
                </View>
            )}
            <View>
                <ScrollView>
                    {nutrients.map((nutrient) => {
                        return goals[nutrient.name] !== "" ? cardWithGoal(nutrient.name, nutrient.title) : cardWithoutGoal(nutrient.name, nutrient.title);
                    })}
                    <View style={styles.blankSpace}></View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    summaryComponentContainer: {
        marginHorizontal: 20
    },
    cardContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        padding: 10,
        paddingVertical: 15,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    excludeCheckContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    excludeText: {
        fontStyle: 'italic',
        marginRight: 5
    },
    iconContainer: {
        marginLeft: 5,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    graphContainer: {
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    contentContainer: {
        flex: 1,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 5
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        fontStyle: 'italic'
    },
    infoContainer: {
        flexDirection: 'row',
    },
    avgContainer: {
        flex: 1,
        alignItems: 'center'
    },
    goalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    infoTitleText: {
        textDecorationLine: 'underline',
        fontWeight: 500
    },
    infoText: {
        fontStyle: 'italic'
    },
    blankSpace: {
        height: 350
    },
})