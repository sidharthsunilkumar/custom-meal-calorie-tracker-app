import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorageVarName = 'meal_tracker_VH6gG4';

export function saveData(type, data) {
    if (type === 'meals') {
        getData(type)
            .then((existingData) => {
                let newData = [];
                if (existingData && Array.isArray(existingData)) {
                    newData = [...existingData, data];
                } else {
                    newData.push(data);
                }
                console.log('newdata', newData)
                AsyncStorage.setItem(localStorageVarName + '_' + type, JSON.stringify(newData))
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        // AsyncStorage.setItem(localStorageVarName + '' + type, JSON.stringify(data))
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }
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