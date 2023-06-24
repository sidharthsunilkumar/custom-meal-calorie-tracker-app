import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "./colors";
import { AntDesign } from '@expo/vector-icons';

export default function Checkbox({ isChecked, toggleFn }) {

    return (
        <TouchableOpacity onPress={toggleFn} style={styles.container}>
            <View >
                <AntDesign name={isChecked ? "checkcircleo" : "checkcircle"} size={20} color={colors.primaryColorLighter} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 3
    }


});