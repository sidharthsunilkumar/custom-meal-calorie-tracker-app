import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddMeal from './addMeal';
import { useEffect, useState } from 'react';
import colors from '../Utils/colors';
import { getData } from '../Utils/localStorageFunctions';
import EachMeal from './eachMeal';

export default function Meals() {

    const [isAddMeal, setIsAddMeal] = useState(false);
    const [myMeals, setMyMeals] = useState([]);

    useEffect(() => {
        // Load todos from storage
        getData('meals').then((data)=>{
            setMyMeals(data)
        })
    }, [isAddMeal]);


    return (
        <View style={styles.container}>
            {isAddMeal && <AddMeal setIsAddMeal={setIsAddMeal} />}
            {!isAddMeal && (
                <View style={styles.mealsContainer}>
                    <Text style={styles.pageHeading}>My Meals</Text>
                    <View style={styles.headingUnderline}></View>

                    <ScrollView>
                        {myMeals.map(meal=> <EachMeal key={meal.id} meal={meal}/> )}
                    </ScrollView>



                    <TouchableOpacity style={styles.createButton} onPress={() => { setIsAddMeal(true) }}>
                        <Text style={styles.createButtonText}>Create a meal</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    mealsContainer: {
        flex:1,
        margin: 20
    },
    pageHeading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headingUnderline: {
        backgroundColor: 'black',
        height: 1,
        marginBottom: 5
    },
    createButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primaryColorLighter,
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16
    }
})