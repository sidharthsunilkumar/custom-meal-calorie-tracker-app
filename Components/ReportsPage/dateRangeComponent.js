import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import {formatDate} from '../Utils/commonFunctions';

export default function DateRangeComponent({ currentDate, startDate}) {

    return (
        <View style={styles.dateContainer}>
            <View style={styles.dateTextContainer}>
                {startDate && (<Text style={styles.dateText}>{formatDate(startDate)}</Text>)}
            </View>
            <AntDesign name='arrowright' size={22} color='black' />
            <View style={styles.dateTextContainer}>
                {currentDate && (<Text style={styles.dateText}>{formatDate(currentDate)}</Text>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
});