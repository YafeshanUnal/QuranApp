import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const PrayerTimes = () => {
	const [prayerTimes, setPrayerTimes] = useState(null);
	const [currentTime, setCurrentTime] = useState(null);
	const [nextPrayer, setNextPrayer] = useState(null);
	const [remainingTime, setRemainingTime] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://api.aladhan.com/v1/timingsByCity",
				{
					params: {
						city: "Corum",
						country: "Turkey",
						method: 13, // Umm al-Qura University, Makkah
					},
				}
			);
			setPrayerTimes(response.data.data.timings);
		};
		fetchData();
		const interval = setInterval(() => {
			const now = new Date();
			setCurrentTime(
				now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
			);

			if (prayerTimes) {
				let nextPrayerTime = "";
				let remainingTimeInMinutes = 0;
				Object.keys(prayerTimes).forEach((prayer) => {
					const prayerTime = new Date(
						`${now.toDateString()} ${prayerTimes[prayer]}`
					);
					if (prayerTime > now && !nextPrayerTime) {
						nextPrayerTime = prayer;
						remainingTimeInMinutes = Math.round((prayerTime - now) / 60000);
					}
				});
				setNextPrayer(nextPrayerTime);
				setRemainingTime(remainingTimeInMinutes);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatRemainingTime = (timeInMinutes) => {
		const hours = Math.floor(timeInMinutes / 60);
		const minutes = timeInMinutes % 60;
		return `${hours} sa ${minutes} dk`;
	};

	const renderPrayerTimeCard = (name, time, iconName) => {
		return (
			<View style={styles.card}>
				<Text style={styles.cardText}>{name}</Text>
				<Icon name={iconName} size={25} />
				<Text style={styles.cardText}>{time}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
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
		// resmin opacity'si 0.5 olacak
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
		flexDirection: "row",
		marginTop: 20,
		gap: 2,
	},

	card: {
		width: "20%",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#cbf4e3",
		opacity: 0.8,
		gap: 5,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		elevation: 2,
	},
	cardText: {
		marginLeft: 10,
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default PrayerTimes;
