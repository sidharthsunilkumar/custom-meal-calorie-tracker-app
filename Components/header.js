import { StyleSheet, Text, View } from 'react-native';
import IconComponent from './HomePage/iconComponent';

export default function Header() {

    return (
        <View style={styles.header}>
            {/* <IconComponent id='calorie' />
            <View style={styles.space}></View> */}
            <Text style={styles.title}>Meal Tracker</Text>
        </View>
    )



}

const styles = StyleSheet.create({
    header: {
        height: '100%',
        width: '100%',
        paddingBottom: 9,
        paddingLeft: 10,
        alignItems: 'flex-start', // Align text to the left
        justifyContent: 'flex-end', // Position text at the bottom
        // paddingTop: 30,
        // flexDirection: 'row'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    space: {
        marginHorizontal: 3
    }
})