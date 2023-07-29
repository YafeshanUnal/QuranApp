import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import * as Location from "expo-location";

const PrayerTimes = () => {
	const [city, setCity] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const [prayerTimes, setPrayerTimes] = useState(null);
	const [nextPrayer, setNextPrayer] = useState("");
	const [remainingTime, setRemainingTime] = useState(0);
	const [locationPermission, setLocationPermission] = useState(null);
	const [location, setLocation] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api.aladhan.com/v1/timingsByCity",
					{
						params: {
							city: city,
							country: "Turkey",
							method: 13, // Umm al-Qura University, Makkah
						},
					}
				);
				setPrayerTimes(response.data.data.timings);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [city]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const currentTime = now.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});

			if (prayerTimes) {
				let nextPrayerTime = "";
				let remainingTimeInMinutes = 0;
				const prayerTimesList = Object.entries(prayerTimes);
				for (let i = 0; i < prayerTimesList.length; i++) {
					const prayer = prayerTimesList[i][0];
					const prayerTime = new Date(
						`${now.toDateString()} ${prayerTimesList[i][1]}`
					);

					if (prayerTime < now) {
						continue; // If the prayer time has already passed, continue to the next one.
					}

					nextPrayerTime = prayer;
					remainingTimeInMinutes = Math.round((prayerTime - now) / (1000 * 60));
					break;
				}

				setNextPrayer(nextPrayerTime);
				setRemainingTime(remainingTimeInMinutes);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [prayerTimes]);

	const formatRemainingTime = (timeInMinutes) => {
		if (isNaN(timeInMinutes) || timeInMinutes < 0) {
			return "Invalid time";
		}
		if (timeInMinutes < 60) {
			return `${timeInMinutes} dk`;
		}
		const hours = Math.floor(timeInMinutes / 60);
		const minutes = timeInMinutes % 60;
		return `${hours} sa ${minutes} dk`;
	};

	const handleLocationPermission = async () => {
		const getPermission = async () => {
			const permission = await Location.requestForegroundPermissionsAsync();
			setLocationPermission(permission);
			if (permission !== "granted") {
				const { coords } = await Location.getCurrentPositionAsync();
				setLocation(coords);
				getCityFromCoordinates(coords.latitude, coords.longitude);
			}
		};
		getPermission();
	};

	const getCityFromCoordinates = async (latitude, longitude) => {
		try {
			const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

			const response = await fetch(url);
			const data = await response.json();

			if (data.address && data.address.city) {
				const city = data.address.city;
				setCity(city);
				return city;
			} else {
				throw new Error("City not found");
			}
		} catch (error) {
			console.log("Failed to get city from coordinates:", error);
			return null;
		}
	};

	const renderPrayerTimeCard = (name, time, iconName) => {
		return (
			<View style={styles.card}>
				<Text style={styles.cardText}>{name}</Text>
				<Text style={styles.cardText}>{time}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* buraya select ekle ve kullanıcının şehrini seçmesini sağla */}
			<View style={styles.locationContainer}>
				<TouchableOpacity
					onPress={handleLocationPermission}
					style={styles.findLocationButton}>
					<Text style={styles.findLocationText}>Konumumu Kullan</Text>
				</TouchableOpacity>
				<RNPickerSelect
					placeholder={{ label: "Şehir Seçin", value: null }}
					items={[
						{ label: "İstanbul", value: "İstanbul" },
						{ label: "Ankara", value: "Ankara" },
						{ label: "İzmir", value: "İzmir" },
						{ label: "Bursa", value: "Bursa" },
					]}
					value={city}
					onValueChange={(value) => setCity(value)}
					style={styles.pickerSelectStyles}
				/>
			</View>
			{city ? <Text style={styles.cityText}>{city}</Text> : null}
			{currentTime && (
				<View style={styles.time}>
					<Text style={styles.currentText}>{currentTime}</Text>
					<Text style={styles.nextText}>{nextPrayer}</Text>
					<Text style={styles.timeText}>{`${formatRemainingTime(
						remainingTime
					)} sonra`}</Text>
				</View>
			)}
			{prayerTimes && (
				<View style={styles.cardContainer}>
					{renderPrayerTimeCard("Sabah", prayerTimes.Fajr, "sun-o")}
					{renderPrayerTimeCard("Öğle", prayerTimes.Dhuhr, "clock-o")}
					{renderPrayerTimeCard("İkindi", prayerTimes.Asr, "moon-o")}
					{renderPrayerTimeCard("Akşam", prayerTimes.Maghrib, "sun-o")}
					{renderPrayerTimeCard("Yatsı", prayerTimes.Isha, "moon-o")}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		marginTop: 50,
	},
	locationContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 10,
		marginBottom: 20,
	},
	findLocationButton: {
		width: "50%",
		height: 50,
		borderRadius: 5,
		backgroundColor: "#FDF5E6",
		justifyContent: "center",
		alignItems: "center",
	},
	pickerSelectStyles: {
		viewContainer: {
			width: "50%",
			height: 50,
			borderRadius: 5,
			backgroundColor: "#FDF5E6",
		},
	},
	cityText: {
		fontSize: 43,
		fontWeight: "bold",
		textAlign: "center",
		borderRadius: 15,
		backgroundColor: "khaki",
		color: "saddlebrown",
		shadowColor: "black",
		opacity: 0.8,
		elevation: 10,
	},
	time: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		padding: 10,
		borderRadius: 5,
		fontSize: 40,
	},
	currentText: {
		fontSize: 60,
		fontWeight: "bold",
	},
	cardContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		marginTop: 20,
		gap: 10,
	},
	card: {
		width: "100%",
		height: 70,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		opacity: 0.8,
		borderRadius: 5,
		elevation: 10,
	},
	cardText: {
		marginLeft: 10,
		fontSize: 28,
		fontWeight: "bold",
		color: "white",
	},
});

export default PrayerTimes;
