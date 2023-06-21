import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { getData } from '../Utils/localStorageFunctions';
import SearchPage from './searchPage';
import colors from '../Utils/colors';
import ConsumedMeals from './consumedMeals';
import SummaryCard from './summaryCard';
import DateComponent from './dateComponent';
import { calculateNutrition, convertToDateString } from '../Utils/commonFunctions';
// import SearchPage from './searchPage';

export default function Home() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [showSearchPage, setShowSearchPage] = useState(false);
    const [meals, setMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [totalNutrition, setTotalNutrition] = useState({
        calorie: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0
    });
    const [goals, setGoals] = useState({
        calorie: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        sugar: ""
    });
    const [percentage, setPercentage] = useState({
        calorie: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        sugar: ""
    });
    const nutrients = ["calorie", "protein", "carbs", "fat", "fiber", "sugar"];

    useEffect(() => {
        getData('goals').then((data) => {
            setGoals(data)
        })
        getData('meals').then((data) => {
            setAllMeals(data)
        })
    }, []);

    useEffect(() => {
        getData("myConsumedMeals_" + convertToDateString(currentDate)).then((data) => {
            if (data && data.length > 0) {
                setMeals(data);
            } else {
                setMeals([]);
            }
        })
        
    }, [currentDate]);

    useEffect(() => {
        calculateTotalNutrition(meals, allMeals)
    }, [meals]);

    useEffect(() => {
        calculateAllPercentage();
    }, [totalNutrition]);

    const calculateTotalNutrition = (mealList, mealInfoList) => {
        const totalNutrition = {
            calorie: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            sugar: 0
        };
        if (mealList.length === 0) {
            setTotalNutrition(totalNutrition);
            return;
        }

        mealList.forEach(meal => {
            const mealInfo = mealInfoList.find(info => info.id === meal.mealId);
            if (mealInfo) {
                for (let nutrient of nutrients) {
                    totalNutrition[nutrient] += calculateNutrition(mealInfo.nutrition[nutrient], meal.quantity, mealInfo.quantity);
                }
            }
        });
        setTotalNutrition(totalNutrition);
    }

    const calculateAllPercentage = () => {
        let newPercentage = { ...percentage };
        for (let nutrient of nutrients) {
            if (totalNutrition[nutrient] !== "" && goals[nutrient] !== "") {
                newPercentage[nutrient] = goals[nutrient] == '0' ? 100 : Math.floor(
                    (totalNutrition[nutrient] / goals[nutrient]) * 100
                );
            }
        }
        setPercentage(newPercentage)
    }

    return (
        <View style={styles.container}>
            {showSearchPage ? (<SearchPage setShowSearchPage={setShowSearchPage} currentDate={currentDate} allMeals={allMeals} setMeals={setMeals} />) : (
                <View style={styles.dashboardContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.pageHeading}>My Dashboard</Text>
                        <View style={styles.headingUnderline}></View>
                    </View>
                    <ScrollView>
                        <View>
                            <SummaryCard totalNutrition={totalNutrition} goals={goals} percentage={percentage} />
                        </View>
                        <View>
                            <DateComponent currentDate={currentDate} setCurrentDate={setCurrentDate} />
                        </View>
                        <View style={styles.headingUnderline}></View>
                        <View>
                            <ConsumedMeals meals={meals} setMeals={setMeals} allMeals={allMeals} />
                        </View>
                    </ScrollView>
                    <View style={styles.addMealButtonContainer}>
                        <TouchableOpacity style={styles.addMealButton} onPress={()=> {setShowSearchPage(true)}} >
                            <Text style={styles.addMealButtonText}>Add a meal</Text>
                        </TouchableOpacity>
                    </View>

                </View>)}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 20,
        paddingBottom: 10
    },
    dashboardContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    headingContainer: {
        marginBottom: 20,
    },
    pageHeading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headingUnderline: {
        backgroundColor: 'black',
        height: 1,
    },
    addMealButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addMealButton: {
        backgroundColor: colors.primaryColorLighter,
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    addMealButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },


})