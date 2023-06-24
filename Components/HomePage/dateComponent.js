import { Feather } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {formatDate} from '../Utils/commonFunctions';


export default function DateComponent({ currentDate, setCurrentDate }) {

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

    return (
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
    )
}

const styles = StyleSheet.create({
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
});