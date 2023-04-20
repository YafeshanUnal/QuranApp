import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/HomeScreen";
import SurahScreen from "./src/screens/SurahScreen";
import QuezScreen from "./src/screens/QuezScreen";
import SurahDetails from "./src/screens/SurahDetails";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabScreen() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Surahs"
				component={SurahScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name="list" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Quez"
				component={QuezScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name="trophy-outline" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
export default function App() {
	const screenOptions = {
		headerMode: "none",
	};

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="MainTabScreen" component={MainTabScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="SurahScreen" component={SurahScreen} />
				<Stack.Screen name="SurahDetails" component={SurahDetails} />
				<Stack.Screen name="QuezScreen" component={QuezScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fff",
	},
	tabItem: {
		alignItems: "center",
		padding: 16,
	},
	tabTitle: {
		fontSize: 14,
		color: "#222",
	},
});
