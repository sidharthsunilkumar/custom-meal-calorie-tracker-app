import { StyleSheet, View } from "react-native";
import { DonutChart } from "react-native-circular-chart";
import colors from "../Utils/colors";
import { useEffect, useState } from "react";

export default function DonutGraph({ color, percent }) {

    const [render, setRender] = useState(true);
    const formatTitle = (percent) => {
        let percentStr = Math.min(percent, 999)
        let nameStr = percentStr === 999 ? percentStr + '+%' : percentStr + '%'
        return nameStr
    }

    let DATA = [{
        name: formatTitle(percent),
        value: Math.max(0.1, Math.min(percent, 100)),
        color: color
    },
    {
        name: formatTitle(percent),
        value: Math.max(100 - percent, 0.1),
        color: colors.grayDarker
    }]

    useEffect(() => {
        DATA = [{
            name: formatTitle(percent),
            value: Math.min(percent, 100),
            color: color
        },
        {
            name: formatTitle(percent),
            value: Math.max(100 - percent, 0.1),
            color: colors.grayDarker
        }]
        setRender(!render)
    }, [percent]);

    const donutView = () => {
        
    }

    return (
        <View style={styles.sectionWrapper}>
            {render && (
                <DonutChart
                data={DATA}
                strokeWidth={5}
                radius={25}
                containerWidth={60}
                containerHeight={60}
                type="butt"
                startAngle={0}
                endAngle={360}
                animationType="slide"
                labelValueStyle={{ display: 'none' }}
                labelTitleStyle={styles.donutText}
            />
            )}
            {!render && (
                <DonutChart
                data={DATA}
                strokeWidth={5}
                radius={25}
                containerWidth={60}
                containerHeight={60}
                type="butt"
                startAngle={0}
                endAngle={360}
                animationType="slide"
                labelValueStyle={{ display: 'none' }}
                labelTitleStyle={styles.donutText}
            />
            )}
            
        </View>
    );

}

const styles = StyleSheet.create({
    sectionWrapper: {
        justifyContent: "center",
        alignItems: "center",
        //   borderWidth: 1,
        //   borderRadius: 8,
        //   borderColor: "lightgray",
        //   backgroundColor: "#ffffff",
        //   marginVertical: 8,

        //   shadowColor: "#000",
        //   shadowOffset: {
        //     width: 0,
        //     height: 1,
        //   },
        //   shadowOpacity: 0.2,
        //   shadowRadius: 1.41,

        //   elevation: 2,
    },
    donutText: {
        fontStyle: 'italic',
        fontSize: 15,
        fontWeight: 700,
        padding: -10,
        margin: -10
    }
});