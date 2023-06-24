import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import colors from './colors';

export default function LoadingComponent() {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spin = Animated.timing(rotation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        });

        Animated.loop(spin).start();
    }, []);

    const spinValue = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          transform: [{ rotate: spinValue }],
        }}
      >
        <MaterialCommunityIcons name="ship-wheel" size={80} color={colors.primaryColorLighter} />
      </Animated.View>
    </View>
    );
}