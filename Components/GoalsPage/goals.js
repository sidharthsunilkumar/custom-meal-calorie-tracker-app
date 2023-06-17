import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getData, saveData } from '../Utils/localStorageFunctions';
import { useEffect, useState } from 'react';
import colors from '../Utils/colors';

export default function Goals() {
    const [calorie, setCalorie] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fat, setFat] = useState("");
    const [fiber, setFiber] = useState("");
    const [sugar, setSugar] = useState("");

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        // Load todos from storage
        getData('goals').then((data) => {
            console.log('pass data-', data)
            if (data) {
                setCalorie(data.calorie);
                setProtein(data.protein);
                setCarbs(data.carbs);
                setFat(data.fat);
                setFiber(data.fiber);
                setSugar(data.sugar);
            } else {
                setIsEdit(true);
            }
        }).catch((error) => {
            console.log('fail data-')
            console.log(error);
            setIsEdit(true);
        })
    }, [isEdit]);

    const handleSaveGoals = () => {
        let data = {
            calorie: calorie || "",
            protein: protein || "",
            carbs: carbs || "",
            fat: fat || "",
            fiber: fiber || "",
            sugar: sugar || "",
        }
        saveData("goals", data)
            .then((success) => {
                if (success) {
                    setIsEdit(false);
                } else {
                    console.log('Error saving data');
                }
            })
            .catch((error) => {
                console.log('Error saving data:', error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.goalsContainer}>
                <Text style={styles.pageHeading}>Daily Goals</Text>
                <View style={styles.headingUnderline}></View>
            </View>
            <ScrollView>
                <View style={styles.itemsContainer}>
                    <View style={styles.rowContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nutritionLabel}>Calorie</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            {isEdit && (
                                <TextInput
                                    style={styles.nutritionInput}
                                    placeholder="Enter calorie"
                                    keyboardType="numeric"
                                    value={calorie}
                                    onChangeText={setCalorie}
                                />
                            )}
                            {!isEdit && (
                                <Text style={[styles.nutritionLabel,styles.italicStyle]}>{calorie !== "" ? `${calorie}` : "Not set"}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nutritionLabel}>Protein</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            {isEdit && (
                                <TextInput
                                    style={styles.nutritionInput}
                                    placeholder="Enter protein"
                                    keyboardType="numeric"
                                    value={protein}
                                    onChangeText={setProtein}
                                />
                            )}
                            {!isEdit && (
                                <Text style={[styles.nutritionLabel,styles.italicStyle]}>{protein !== "" ? `${protein} g` : "Not set"}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nutritionLabel}>Carbs</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            {isEdit && (
                                <TextInput
                                    style={styles.nutritionInput}
                                    placeholder="Enter carbs"
                                    keyboardType="numeric"
                                    value={carbs}
                                    onChangeText={setCarbs}
                                />
                            )}
                            {!isEdit && (
                                <Text style={[styles.nutritionLabel,styles.italicStyle]}>{carbs !== "" ? `${carbs} g` : "Not set"}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nutritionLabel}>Fat</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            {isEdit && (
                                <TextInput
                                    style={styles.nutritionInput}
                                    placeholder="Enter fat"
                                    keyboardType="numeric"
                                    value={fat}
                                    onChangeText={setFat}
                                />
                            )}
                            {!isEdit && (
                                <Text style={[styles.nutritionLabel,styles.italicStyle]}>{fat !== "" ? `${fat} g` : "Not set"}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nutritionLabel}>Fiber</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            {isEdit && (
                                <TextInput
                                    style={styles.nutritionInput}
                                    placeholder="Enter fiber"
                                    keyboardType="numeric"
                                    value={fiber}
                                    onChangeText={setFiber}
                                />
                            )}
                            {!isEdit && (
                                <Text style={[styles.nutritionLabel,styles.italicStyle]}>{fiber !== "" ? `${fiber} g` : "Not set"}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nutritionLabel}>Sugar</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            {isEdit && (
                                <TextInput
                                    style={styles.nutritionInput}
                                    placeholder="Enter sugar"
                                    keyboardType="numeric"
                                    value={sugar}
                                    onChangeText={setSugar}
                                />
                            )}
                            {!isEdit && (
                                <Text style={[styles.nutritionLabel,styles.italicStyle]}>{sugar !== "" ? `${sugar} g` : "Not set"}</Text>
                            )}
                        </View>
                    </View>
                </View>
                {!isEdit && (
                    <View style={styles.editViewContainer}>
                        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => { setIsEdit(true) }}>
                            <Text style={[styles.buttonText, styles.editButtonText]}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {isEdit && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => { setIsEdit(false) }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                        <TouchableOpacity style={styles.button} onPress={handleSaveGoals}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    goalsContainer: {
        margin: 20
    },
    pageHeading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headingUnderline: {
        backgroundColor: 'black',
        height: 1,
    },
    itemsContainer: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    rowContainer: {
        flexDirection: 'row',
        height: 40,
        marginVertical:10
    },
    labelContainer:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    valueContainer:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },      
    nutritionLabel: {
        fontSize: 16,
    },
    italicStyle: {
        fontStyle: 'italic',
    },
    nutritionInput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20
    },
    spacer: {
        flex: 1,
    },
    button: {
        width: 100,
        paddingVertical: 10,
        borderRadius: 18,
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
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center', // Align text horizontally in the center
    },
    editViewContainer: {
        marginVertical: 25,
        flex: 1,
        alignItems: 'center'
    },
    editButton: {
        width: 150,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    editButtonText: {
        color: colors.primaryColorLighter
    }
      
})