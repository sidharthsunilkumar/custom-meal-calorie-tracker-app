import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getData } from '../Utils/localStorageFunctions';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Utils/colors';
import DateRangeComponent from './dateRangeComponent';
import LoadingComponent from '../Utils/loadingComponent';
import { convertToDateString } from '../Utils/commonFunctions';
import SummaryComponent from './summaryComponent';
import { ScrollView } from 'react-native';

export default function Reports() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [consumedList, setConsumedList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const dropDownData = [
        { label: 'Last 7 days', value: 'week' },
        { label: 'Last 30 days', value: 'month' },
    ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (value) {
            const tempDate = new Date(currentDate);
            if (value === 'week') {
                tempDate.setDate(currentDate.getDate() - 6);
            } else if (value === 'month') {
                tempDate.setDate(currentDate.getDate() - 29);
            }
            setStartDate(tempDate);
        }
    }, [value]);

    useEffect(() => {

        if (startDate) {
            setIsLoading(true);
            generateReport()
        }
    }, [startDate]);

    const generateReport = async () => {
        const tempDate = new Date(startDate);
        let reportObj = {};
        while (tempDate <= currentDate) {
            const data = await getConsumedDataOfDate(tempDate);
            reportObj[convertToDateString(tempDate)] = data;
            tempDate.setDate(tempDate.getDate() + 1);
        }
        setConsumedList(reportObj)
        setIsLoading(false)
    };
    
    const getConsumedDataOfDate = async (date) => {
        const data = await getData("myConsumedMeals_" + convertToDateString(date));
        if (data && data.length > 0) {
            return data;
        } else {
            return null;
        }
    };
    


    return (
        <View style={styles.container}>
            <View style={styles.reportsContainer}>
                <Text style={styles.pageHeading}>My Reports</Text>
                <View style={styles.headingUnderline}></View>
            </View>
            <View style={styles.dropDownContainer}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: colors.primaryColorLighter }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={dropDownData}
                    labelField="label"
                    valueField="value"
                    placeholder='Select report type'
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={colors.primaryColorLighter}
                            name="calendar"
                            size={20}
                        />
                    )}
                />
            </View>
            {value && (
                <DateRangeComponent currentDate={currentDate} startDate={startDate} />
            )}
            {/* <ScrollView> */}
            {value && (
                isLoading ? (
                    <View style={styles.summaryContainer}>
                        <View style={{ marginTop: 150 }}>
                            <LoadingComponent />
                        </View>
                    </View>
                ) : (
                    <View style={styles.summaryContainer}>
                        <SummaryComponent setIsLoading={setIsLoading} consumedList={consumedList} />
                    </View>
                )
            )}
            {/* </ScrollView> */}
            

        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    reportsContainer: {
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
    dropDownContainer: {
        marginHorizontal: 20
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        fontStyle: 'italic'
    },
    icon: {
        marginRight: 10,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontStyle: 'italic'
    },
    placeholderStyle: {
        fontSize: 16,
        fontStyle: 'italic'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontStyle: 'italic'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        marginVertical: 20
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
})