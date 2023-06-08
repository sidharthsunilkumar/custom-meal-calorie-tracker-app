import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../Utils/colors';
import uuid from 'react-native-uuid';
import { deleteMeal, editMealsData, saveData } from '../Utils/localStorageFunctions';

export default function EditMeal({ meal, deactivateEdit }) {
    const [name, setName] = useState(meal.name);
    const [description, setDescription] = useState(meal.description);
    const [quantity, setQuantity] = useState(meal.quantity);
    const [measureType, setMeasureType] = useState(meal.measureType);
    const [calorie, setCalorie] = useState(meal.nutrition.calorie);
    const [protein, setProtein] = useState(meal.nutrition.protein);
    const [carbs, setCarbs] = useState(meal.nutrition.carbs);
    const [fat, setFat] = useState(meal.nutrition.fat);
    const [fiber, setFiber] = useState(meal.nutrition.fiber);
    const [sugar, setSugar] = useState(meal.nutrition.sugar);

    const [isCheck, setIsCheck] = useState(false);

    const handleSaveMeal = () => {
        setIsCheck(true)
        const checked = performChecks();
        if (checked) {
            let data = {
                id: meal.id,
                name: name,
                description: description,
                measureType: measureType,
                quantity: quantity,
                nutrition: {
                    calorie: calorie || "0",
                    protein: protein || "0",
                    carbs: carbs || "0",
                    fat: fat || "0",
                    fiber: fiber || "0",
                    sugar: sugar || "0"
                }
            };
            editMealsData(data)
                .then((success) => {
                    if (success) {
                        deactivateEdit();
                    }
                })
                .catch((error) => {
                    console.log('Edit operation error:', error);
                });
        }
    };

    const handleDeleteMeal = () => {
        deleteMeal(meal)
            .then((success) => {
                if (success) {
                    deactivateEdit();
                }
            })
            .catch((error) => {
                console.log('Delete operation error:', error);
            });
    };


    const performChecks = () => {
        if (name === '') { return false }
        if (quantity === '') { return false }
        return true;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Meal</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Name*</Text>
                <TextInput
                    style={[styles.input, isCheck && name === '' && styles.input_incomplete]}
                    placeholder="Enter name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.multilineInput}
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholder="Enter description (Optional)"
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.rowContainer}>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.label}>Quantity*</Text>
                        <TextInput
                            style={[styles.input, styles.quantityInput, isCheck && quantity === '' && styles.input_incomplete]}
                            placeholder="Enter quantity"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                    </View>
                    <View style={styles.measureTypeContainer}>
                        <Text style={styles.label}>Measure in*</Text>
                        <Picker
                            style={styles.measureTypePicker}
                            selectedValue={measureType}
                            onValueChange={(itemValue) => setMeasureType(itemValue)}
                        >
                            <Picker.Item label="Grams" value="Grams" />
                            <Picker.Item label="Servings" value="Servings" />
                            <Picker.Item label="Cup" value="Cup" />
                            <Picker.Item label="Oz" value="Oz" />
                            <Picker.Item label="ML" value="ML" />
                            <Picker.Item label="Scoop" value="Scoop" />
                            <Picker.Item label="Tsp" value="Tsp" />
                            <Picker.Item label="Tbsp" value="Tbsp" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.nutritionHeader}>
                    <Text style={styles.subheading}>Nutrition</Text>
                    <View style={styles.underline} />
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Calorie</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        placeholder="Enter calorie"
                        keyboardType="numeric"
                        value={calorie}
                        onChangeText={setCalorie}
                    />
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Protein</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        placeholder="Enter protein"
                        keyboardType="numeric"
                        value={protein}
                        onChangeText={setProtein}
                    />
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Carbs</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        placeholder="Enter carbs"
                        keyboardType="numeric"
                        value={carbs}
                        onChangeText={setCarbs}
                    />
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Fat</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        placeholder="Enter fat"
                        keyboardType="numeric"
                        value={fat}
                        onChangeText={setFat}
                    />
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Fiber</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        placeholder="Enter fiber"
                        keyboardType="numeric"
                        value={fiber}
                        onChangeText={setFiber}
                    />
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Sugar</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        placeholder="Enter sugar"
                        keyboardType="numeric"
                        value={sugar}
                        onChangeText={setSugar}
                    />
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => { deactivateEdit() }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
                <TouchableOpacity style={styles.button} onPress={handleSaveMeal}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.deleteViewContainer}>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteMeal()}>
                    <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Meal</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    input_incomplete: {
        borderColor: 'red'
    },
    multilineInput: {
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    quantityContainer: {
        flex: 1,
        marginRight: 8,
    },
    quantityInput: {
        flex: 1,
    },
    measureTypeContainer: {
        flex: 1,
        marginLeft: 8,
    },
    measureTypePicker: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    nutritionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    underline: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
        marginLeft: 8,
    },
    nutritionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    nutritionLabel: {
        flex: 1,
        fontSize: 16,
        marginRight: 8,
    },
    nutritionInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
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
    deleteViewContainer: {
        marginVertical: 15
    },
    deleteButton: {
        width: 150,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    deleteButtonText: {
        color: colors.primaryColorLighter
    }
});
