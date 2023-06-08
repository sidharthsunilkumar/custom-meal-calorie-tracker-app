import { StyleSheet, Text, View } from 'react-native';
import AddMeal from '../MealsPage/addMeal';

export default function Home() {

    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'coral',
        height: '100%'
    },
})