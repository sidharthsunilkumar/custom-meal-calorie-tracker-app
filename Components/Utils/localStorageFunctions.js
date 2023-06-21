import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorageVarName = 'meal_tracker_VH6gG4';

export function saveData(type, data) {
    return new Promise((resolve, reject) => {
        if (type === 'meals') {
            getData(type)
                .then((existingData) => {
                    let newData = [];
                    if (existingData && Array.isArray(existingData)) {
                        newData = [...existingData, data];
                    } else {
                        newData.push(data);
                    }
                    // console.log('newdata', newData);
                    AsyncStorage.setItem(localStorageVarName + '_' + type, JSON.stringify(newData))
                        .then(() => {
                            resolve(true); // Return true for success
                        })
                        .catch((error) => {
                            console.log(error);
                            resolve(false); // Return false for failure
                        });
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false); // Return false for failure
                });
        } else if (type === 'goals') {
            AsyncStorage.setItem(localStorageVarName + '_' + type, JSON.stringify(data))
                .then(() => {
                    resolve(true); // Return true for success
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false); // Return false for failure
                });
        } else if (type === 'consumed_meals') {
            getData(type + '_' + data.currentDate)
                .then((existingData) => {
                    let newData = [];
                    let date = data.currentDate;
                    delete data.currentDate;
                    if (existingData && Array.isArray(existingData)) {
                        newData = [...existingData, data];
                    } else {
                        newData.push(data);
                    }
                    // console.log('newdata', newData);
                    AsyncStorage.setItem(localStorageVarName + '_' + type + '_' + date, JSON.stringify(newData))
                        .then(() => {
                            resolve(true); // Return true for success
                        })
                        .catch((error) => {
                            console.log(error);
                            resolve(false); // Return false for failure
                        });
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false); // Return false for failure
                });
        }
    });
}


export async function getData(type) {
    try {
        const data = await AsyncStorage.getItem(localStorageVarName + '_' + type);
        // console.log('getData-',data)
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

// 'meals' functions
export function editMealsData(data) {
    return new Promise((resolve, reject) => {
        getData('meals')
            .then((existingData) => {
                if (existingData && Array.isArray(existingData)) {
                    const updatedData = existingData.map((item) => {
                        if (item.id === data.id) {
                            return data; // Replace the existing item with the updated data
                        }
                        return item; // Keep the other items unchanged
                    });

                    AsyncStorage.setItem(
                        localStorageVarName + '_meals',
                        JSON.stringify(updatedData)
                    )
                        .then(() => {
                            resolve(true); // Return true for success
                        })
                        .catch((error) => {
                            console.log('Error updating data:', error);
                            resolve(false); // Return false for failure
                        });
                } else {
                    resolve(false); // Return false for failure if existingData is not an array
                }
            })
            .catch((error) => {
                console.log(error);
                resolve(false); // Return false for failure if an error occurs
            });
    });
}

export function deleteMeal(data) {
    return new Promise((resolve, reject) => {
        getData('meals')
            .then((existingData) => {
                if (existingData && Array.isArray(existingData)) {
                    const filteredData = existingData.filter((item) => item.id !== data.id);

                    AsyncStorage.setItem(
                        localStorageVarName + '_meals',
                        JSON.stringify(filteredData)
                    )
                        .then(() => {
                            resolve(true); // Return true for success
                        })
                        .catch((error) => {
                            console.log('Error deleting data:', error);
                            resolve(false); // Return false for failure
                        });
                } else {
                    resolve(false); // Return false for failure if existingData is not an array
                }
            })
            .catch((error) => {
                console.log(error);
                resolve(false); // Return false for failure if an error occurs
            });
    });
}

export function addAConsumedMeal(meal) {
    const type = "myConsumedMeals_" + meal.currentDate;
    return new Promise((resolve, reject) => {
        getData(type)
            .then((existingData) => {
                let newData = [];
                if (existingData && Array.isArray(existingData)) {
                    newData = [...existingData, meal];
                } else {
                    newData.push(meal);
                }
                AsyncStorage.setItem(localStorageVarName + '_' + type, JSON.stringify(newData))
                    .then(() => {
                        resolve(true); // Return true for success
                    })
                    .catch((error) => {
                        console.log(error);
                        resolve(false); // Return false for failure
                    });
            })
            .catch((error) => {
                console.log(error);
                resolve(false); // Return false for failure
            });
    });
}

export function deleteAConsumedMeal(meal) {
    const type = "myConsumedMeals_" + meal.currentDate;
    return new Promise((resolve, reject) => {
        getData(type)
            .then((existingData) => {
                let newData = existingData.filter((obj) => meal.id != obj.id);
                AsyncStorage.setItem(localStorageVarName + '_' + type, JSON.stringify(newData))
                    .then(() => {
                        resolve(true); // Return true for success
                    })
                    .catch((error) => {
                        console.log(error);
                        resolve(false); // Return false for failure
                    });
            })
            .catch((error) => {
                console.log(error);
                resolve(false); // Return false for failure
            });
    });
}

export function editAConsumedMeal(meal) {
    const type = "myConsumedMeals_" + meal.currentDate;
    return new Promise((resolve, reject) => {
        getData(type)
            .then((existingData) => {
                let newData = existingData.map((obj) => {
                    if (meal.id === obj.id) {
                        return meal;
                    }
                    return obj;
                });
                AsyncStorage.setItem(localStorageVarName + '_' + type, JSON.stringify(newData))
                    .then(() => {
                        resolve(true); // Return true for success
                    })
                    .catch((error) => {
                        console.log(error);
                        resolve(false); // Return false for failure
                    });
            })
            .catch((error) => {
                console.log(error);
                resolve(false); // Return false for failure
            });
    });
}


