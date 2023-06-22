import { View, Image } from "react-native"
import { Asset, useAssets } from 'expo-asset';

export default function IconComponent({ id }) {

    const idIndex = {
        calorie: 0,
        protein: 1,
        carbs: 2,
        fat: 3,
        fiber: 4,
        sugar: 5,
        nutrition: 6,
        energy: 7
    }

    const [assets, error] = useAssets([
        require(`../../assets/nutri-icons-white/calorie_icon.png`),
        require(`../../assets/nutri-icons-white/protein_icon.png`),
        require(`../../assets/nutri-icons-white/carbs_icon.png`),
        require(`../../assets/nutri-icons-white/fat_icon.png`),
        require(`../../assets/nutri-icons-white/fiber_icon.png`),
        require(`../../assets/nutri-icons-white/sugar_icon.png`),
        require(`../../assets/nutri-icons-white/nutrition_icon.png`),
        require(`../../assets/nutri-icons-white/energy_icon.png`)
    ]);

    return (
        assets ? <Image source={assets[idIndex[id]]} style={[{ width: 35, height: 35 }, id === 'sugar' ? { width: 40, height: 30 } : null]} /> : null
    )
}