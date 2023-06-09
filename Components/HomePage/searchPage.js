import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { getData } from "../Utils/localStorageFunctions";
import colors from "../Utils/colors";
import EachMealInSearchPage from "./eachMealInSearchMeal";

export default function SearchPage({ setShowSearchPage, currentDate, allMeals, setMeals }) {
    
    const [query, setQuery] = useState('');

    const filteredMeals = allMeals.filter((meal) =>
        meal.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.pageHeading}>Add your meal</Text>
            <View style={styles.headingUnderline}></View>

            <View style={styles.searchContainer}>
                <View style={styles.searchButtonContainer}>
                    <TouchableOpacity style={styles.goBackButton} onPress={() => { setShowSearchPage(false) }}>
                        <Text style={styles.goBackButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchTextContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for meals"
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>
            </View>
            {filteredMeals.length == 0 && (
                <View style={styles.noMealsTextContainer}>
                    <Text style={styles.noMealsText}>You haven't created any meals!</Text>
                    <Text style={styles.noMealsText}>Create one in the 'Meals' tab below!</Text>
                </View>
            )}
            <ScrollView>
                {filteredMeals.map(meal => <EachMealInSearchPage key={meal.id} meal={meal} currentDate={currentDate} setMeals={setMeals} />)}
                <View style={styles.blankSpace}></View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
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
    searchContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchButtonContainer: {
        flex: 2
    },
    searchTextContainer: {
        flex: 6
    },
    goBackButton: {
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 30,
        backgroundColor: colors.primaryColorLighter,
        justifyContent: 'center', // Align text vertically in the center
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    goBackButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    searchInput: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 30,
    },
    noMealsTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },
    noMealsText: {
        color: colors.grayText,
        fontSize: 17,
        marginBottom: 10
    }

})
