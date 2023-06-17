import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { getData } from '../Utils/localStorageFunctions';
import SearchPage from './searchPage';
// import SearchPage from './searchPage';

export default function Home() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [showSearchPage, setShowSearchPage] = useState(true);

    const [nutritionGoals, setNutritionGoals] = useState({
        calorie: "2000",
        protein: "130",
        carbs: "250",
        fat: "60",
        fiber: "27",
        sugar: "20",
    });

    const [totalNutritionGoals, setTotalNutrition] = useState({
        calorie: "2200",
        protein: "100",
        carbs: "0",
        fat: "30",
        fiber: "24",
        sugar: "20",
    });

    const goBackDate = () => {
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(previousDate);
    };
    const goForwardDate = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(nextDate);
    };
    const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric', year: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <View style={styles.container}>
            {showSearchPage ? (<SearchPage currentDate={currentDate} setShowSearchPage={setShowSearchPage} />) : (
                <View style={styles.dashboardContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.pageHeading}>My Dashboard</Text>
                        <View style={styles.headingUnderline}></View>
                    </View>
                    <ScrollView>
                        <View style={styles.summaryCardContainer}>

                        </View>
                        <View style={styles.dateContainer}>
                            <TouchableOpacity onPress={goBackDate} style={styles.dateButtonContainer}>
                                <Text><Feather name='arrow-left-circle' size={26} color='black' /></Text>
                            </TouchableOpacity>
                            <View style={styles.dateTextContainer}>
                                <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
                            </View>
                            <TouchableOpacity onPress={goForwardDate} style={[styles.dateButtonContainer, { alignItems: 'flex-end' }]}>
                                <Feather name='arrow-right-circle' size={26} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.addMealButtonContainer}>
                            <TouchableOpacity style={styles.addMealButton}>
                                <Text style={styles.addMealButtonText}>Add Meal</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>)}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 20,
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
        height: 200,
    },
    dateContainer: {
        flexDirection: 'row',
    },
    dateButtonContainer: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dateTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        alignItems: 'center',
        justifyContent: 'center',
        textDecorationLine: 'underline',
        fontSize: 18,
        fontWeight: 600
    },
    addMealButtonContainer: {
        backgroundColor: 'aqua',
        // height: '100%',
        flex: 1,
        // position: 'relative',
        // bottom: 20,
        // left: 0,
        // right: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
    // addMealButton: {
    //     backgroundColor: '#1E90FF',
    //     borderRadius: 10,
    //     paddingVertical: 15,
    //     paddingHorizontal: 20,
    // },
    // addMealButtonText: {
    //     color: '#FFFFFF',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },
    

})