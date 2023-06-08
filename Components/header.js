import { StyleSheet, Text, View } from 'react-native';

export default function Header() {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Meal Tracker</Text>
        </View>
    )



}

const styles = StyleSheet.create({
    header: {
        height: '100%',
        width: '100%',
        alignItems: 'flex-start', // Align text to the left
        justifyContent: 'flex-end', // Position text at the bottom
        paddingBottom: 9,
        paddingLeft: 10
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})