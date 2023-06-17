import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import colors from './Components/Utils/colors';

import BottomNavBar from './Components/bottomNavBar';
import Home from './Components/HomePage/home';
import Meals from './Components/MealsPage/meals';
import Reports from './Components/ReportsPage/reports';
import Goals from './Components/GoalsPage/goals';
import Header from './Components/header';

export default function App() {

  const [activeTab, setActiveTab] = useState('home');
  const [seeNavBar, setSeeNavBar] = useState(true);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  let page;
  if (activeTab === 'home') {
    page = <Home />;
  } else if (activeTab === 'meals') {
    page = <Meals />;
  } else if (activeTab === 'reports') {
    page = <Reports />;
  } else if (activeTab === 'goals') {
    page = <Goals />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.page}>
        {page}
      </View>
      {seeNavBar && (
        <View style={styles.navbar}>
          <BottomNavBar activeTab={activeTab} onChangeTab={handleTabChange} />
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    backgroundColor: colors.primaryColor,
  },
  page: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
  navbar: {
    height: 60,
    backgroundColor: 'blue',
  },
});