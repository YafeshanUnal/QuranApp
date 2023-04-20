import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";
export default function SurahDetails({ route }) {
	const [surahDetails, setSurahDetails] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioPlayer, setAudioPlayer] = useState(null);
	const { id } = route.params;

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`https://api.acikkuran.com/surah/${id}`);
			const data = await response.json();
			setSurahDetails(data.data);
			loadAudio(data.data.audio.mp3);
		}
		fetchData();
	}, [id]);

	const loadAudio = async (audioPath) => {
		const { sound } = await Audio.Sound.createAsync({ uri: audioPath });
		setAudioPlayer(sound);
	};

	const playAudio = async () => {
		if (audioPlayer) {
			if (isPlaying) {
				setIsPlaying(false);
				await audioPlayer.stopAsync();
			} else {
				setIsPlaying(true);
				await audioPlayer.playAsync();
			}
		}
	};

	const stopAudio = async () => {
		if (audioPlayer) {
			setIsPlaying(false);
			await audioPlayer.stopAsync();
		}
	};

	const pauseAudio = async () => {
		if (audioPlayer && isPlaying) {
			await audioPlayer.pauseAsync();
			setIsPlaying(false);
			const status = await audioPlayer.getStatusAsync();
			const position = status.positionMillis;
			setCurrentPosition(position);
		}
	};

	const resumeAudio = async () => {
		if (audioPlayer && !isPlaying) {
			await audioPlayer.playFromPositionAsync(currentPosition);
			setIsPlaying(true);
		}
	};

	return (
		<View style={styles.container}>
			{surahDetails && (
				<ScrollView>
					<Text style={styles.title}>{surahDetails.name}</Text>
					<Text style={styles.text}>Sure: {surahDetails.slug}</Text>
					<Text style={styles.text}>
						Ayet Sayısı: {surahDetails.verse_count}
					</Text>
					<Button
						title={isPlaying ? "Durdur" : "Oynat"}
						onPress={isPlaying ? stopAudio : playAudio}
					/>
					{surahDetails.verses.map((verse) => (
						<View key={verse.id} style={styles.card}>
							<Text style={styles.cardTitle}>{verse.verse_number}. Ayet</Text>
							<Text style={styles.cardText}>{verse.verse}</Text>
							<Text style={styles.cardText}>{verse.transcription}</Text>
							<Text style={styles.cardText}>{verse.translation.text}</Text>
						</View>
					))}
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 15,
	},
	text: {
		fontSize: 20,
		marginBottom: 10,
		fontWeight: "bold",
	},
	card: {
		backgroundColor: "#f2f2f2",
		width: "100%",
		marginVertical: 10,
		padding: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	cardText: {
		fontSize: 16,
		marginBottom: 5,
	},
});
