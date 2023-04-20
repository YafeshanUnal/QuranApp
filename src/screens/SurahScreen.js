import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";

export default function SurahScreen({ navigation }) {
	const [surahs, setSurahs] = useState([]);

	useEffect(() => {
		fetch("https://api.acikkuran.com/surahs")
			.then((response) => response.json())
			.then((data) => setSurahs(data.data))
			.catch((error) => console.error(error));
	}, []);

	const handlePress = (id) => {
		navigation.navigate("SurahDetails", { id });
	};
	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30, fontWeight: "bold" }}>Sûreler</Text>
			<FlatList
				style={styles.flatList}
				data={surahs}
				keyExtractor={(item) => item.number}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handlePress(item.id)}>
						<View style={styles.card}>
							<View style={styles.cardTitle}>
								<Text style={styles.id}>{item.id}</Text>
								<Text style={styles.name}>{item.name}</Text>
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
	},
	flatList: {
		width: "100%",
		paddingHorizontal: 20,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 20,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	cardTitle: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		color: "#2c3e50",
	},
	id: {
		fontSize: 20,
		fontWeight: "bold",
		color: "red",
		width: 50,
		textAlign: "center",
	},
	name: {
		width: 100,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	cardSubtitle: {
		fontSize: 14,
		color: "#7f8c8d",
	},
});
