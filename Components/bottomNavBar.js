import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import colors from './Utils/colors';

export default function BottomNavBar({ activeTab, onChangeTab }) {

    const tabs = [
        { id: 'home', name: 'Home', icon: 'home', iconType: 'AntDesign' },
        { id: 'meals', name: 'Meals', icon: 'cutlery', iconType: 'FontAwesome' },
        { id: 'reports', name: 'Reports', icon: 'linechart', iconType: 'AntDesign' },
        { id: 'goals', name: 'Goals', icon: 'bullseye', iconType: 'FontAwesome' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    style={styles.tab}
                    onPress={() => onChangeTab(tab.id)}
                >
                    {tab.iconType === 'AntDesign' ? (
                        <AntDesign name={tab.icon} size={24} color={activeTab === tab.id ? colors.primaryColor : '#999'} />
                    ) : (
                        <FontAwesome name={tab.icon} size={24} color={activeTab === tab.id ? colors.primaryColor : '#999'} />
                    )}
                    <Text style={[styles.tabText, { color: activeTab === tab.id ? colors.primaryColor : '#999' }]}>
                        {tab.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: colors.primaryColor,
        backgroundColor: '#fff',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 12,
        marginTop: 2,
    },
});
