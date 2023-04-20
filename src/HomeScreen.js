import React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PrayerTimes from "./components/PrayerTimes";

const HomeScreen = () => {
	const navigation = useNavigation();

	const handlePressSurah = () => {
		navigation.navigate("SurahScreen");
	};

	const handlePressPrayer = () => {
		navigation.navigate("PrayerScreen");
	};

	const handlePressQuiz = () => {
		navigation.navigate("QuizScreen");
	};

	return (
		<ImageBackground
			source={require("../assets/sultanahmet.jpg")}
			style={styles.container}>
			<PrayerTimes />
			{/* <TouchableOpacity
				style={[styles.box, styles.box1]}
				onPress={handlePressSurah}>
				<Text style={styles.text}>Sûreler</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.box, styles.box2]}
				onPress={handlePressPrayer}>
				<Text style={styles.text}>Namaz Vakitleri</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.box, styles.box3]}
				onPress={handlePressQuiz}>
				<Text style={styles.text}>Yarışma</Text>
			</TouchableOpacity> */}
			{/* <View style={styles.tabBar}>
				<TouchableOpacity style={styles.tabItem} onPress={handlePressSurah}>
					<Text style={styles.tabTitle}>Sûreler</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tabItem} onPress={handlePressPrayer}>
					<Text style={styles.tabTitle}>Namaz Vakitleri</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tabItem} onPress={handlePressQuiz}>
					<Text style={styles.tabTitle}>Yarışma</Text>
				</TouchableOpacity>
			</View> */}
		</ImageBackground>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		padding: 16,
		blurRadius: 10,
	},
	box: {
		width: "100%",
		height: 50,
		borderRadius: 10,
		marginVertical: 16,
		justifyContent: "center",
		alignItems: "center",
		elevation: 2,
	},
	box1: {
		backgroundColor: "#7ed6df",
	},
	box2: {
		backgroundColor: "#e056fd",
	},
	box3: {
		backgroundColor: "#f0932b",
	},
	text: {
		fontSize: 24,
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
	tabBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: 50,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 2,
	},
	tabItem: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	tabTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
