import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Text, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }: any) {
	return (
		<View style={styles.container}>
			<Text variant="titleLarge">MyGymApp</Text>
			<Text>Works fully offline. No network required.</Text>
			<Button mode="contained" onPress={() => navigation.navigate('Charts')}>Open Charts</Button>
			<StatusBar style="auto" />
		</View>
	);
}

function ChartsScreen() {
	return (
		<View style={styles.container}>
			<Text variant="titleLarge">Charts</Text>
			<Text>Charts will render using recharts with local data.</Text>
		</View>
	);
}

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Charts" component={ChartsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		gap: 12,
	},
});
