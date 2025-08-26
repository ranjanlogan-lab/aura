import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeDatabase } from './src/db/sqlite';
import TodayScreen from './src/screens/TodayScreen';
import ProgramScreen from './src/screens/ProgramScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { AppTheme, PaperTheme } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    void initializeDatabase();
  }, []);

  return (
    <PaperProvider theme={PaperTheme}>
      <NavigationContainer theme={AppTheme as any}>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: AppTheme.colors.card },
            headerTintColor: AppTheme.colors.text,
            tabBarStyle: { backgroundColor: AppTheme.colors.card },
            tabBarActiveTintColor: AppTheme.colors.primary,
            tabBarInactiveTintColor: AppTheme.colors.secondaryText,
          }}
        >
          <Tab.Screen name="Today" component={TodayScreen} />
          <Tab.Screen name="Program" component={ProgramScreen} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
