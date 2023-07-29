import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	TextInput,
} from "react-native";

export default function SurahScreen({ navigation }) {
	const [allSurahs, setAllSurahs] = useState([]);
	const [surahs, setSurahs] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch("https://api.acikkuran.com/surahs")
			.then((response) => response.json())
			.then((data) => {
				setAllSurahs(data.data);
				setSurahs(data.data);
			})
			.catch((error) => console.error(error));
	}, []);

	const handlePress = (id) => {
		navigation.navigate("SurahDetails", { id });
	};

	const searchFilterFunction = (text) => {
		setSearch(text);
		if (text === "") {
			setSurahs(allSurahs);
		} else {
			const newData = allSurahs.filter((item) => {
				const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setSurahs(newData);
		}
	};
	console.log("allSurahs", allSurahs);

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30, fontWeight: "bold" }}>Sûreler</Text>
			{/* search bar */}
			<View style={styles.searchBar}>
				<TextInput
					style={styles.searchInput}
					placeholder="Arama..."
					onChangeText={(text) => searchFilterFunction(text)}
					value={search}
				/>
			</View>

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
								<Text style={styles.name}>{item.name_original}</Text>
							</View>
							<View style={styles.cardSubtitle}>
								<Text style={styles.cardDescription}>
									Kuran'daki başlangıç sayfası: {item.pageNumber}
								</Text>
								<Text style={styles.cardDescription}>
									Sayfa Sayısı {item.endPageNumber}
								</Text>
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
	searchBar: {
		width: "100%",
		paddingHorizontal: 20,
		marginVertical: 10,
		borderBottomWidth: 1,
		borderColor: "#ddd",
	},
	flatList: {
		width: "100%",
		paddingHorizontal: 20,
	},
	card: {
		width: "100%",
		height: 150,
		borderRadius: 10,
		shadowColor: "tomato",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 20,
	},
	cardTitle: {
		width: "100%",
		height: 50,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "khaki",
	},
	cardDescription: {
		fontSize: 18,
		color: "#7f8c8d",
		paddingVertical: 10,
		paddingHorizontal: 20,
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
