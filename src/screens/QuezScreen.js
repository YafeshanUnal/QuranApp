import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const QuezScreen = () => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [timer, setTimer] = useState(0);
	const [timerInterval, setTimerInterval] = useState(null);
	const [trueAnswer, setTrueAnswer] = useState(0);
	const [falseAnswer, setFalseAnswer] = useState(0);

	useEffect(() => {
		// burada, bir API'den veya bir statik veri kaynağından soruları çekebilirsiniz
		const questionsData = [
			{
				id: 1,
				question: "İslam dininin kutsal kitabının adı nedir?",
				options: ["Tebligat", "Hadis", "İncil", "Kuran"],
				answerIndex: 3,
			},
			{
				id: 2,
				question: "Hz. Muhammed'in doğduğu şehir neresidir?",
				options: ["Medine", "Kahire", "Mekke", "İstanbul"],
				answerIndex: 2,
			},
			{
				id: 3,
				question: "İslam'ın beş şartından biri olan 'Namaz' kaç vakit kılınır?",
				options: ["2", "3", "4", "5"],
				answerIndex: 3,
			},
			{
				id: 4,
				question: "Hz. Muhammed'in ilk eşi kimdir?",
				options: ["Hatice", "Ayşe", "Fatma", "Zeynep"],
				answerIndex: 0,
			},
			{
				id: 5,
				question: "İslam'ın beş şartından biri olan 'Oruç' hangi ayda tutulur?",
				options: ["Ramazan", "Şaban", "Recep", "Muharrem"],
				answerIndex: 0,
			},
			{
				id: 6,
				question: "Kabe hangi şehirde yer almaktadır?",
				options: ["Medine", "Kahire", "Mekke", "İstanbul"],
				answerIndex: 2,
			},
			{
				id: 7,
				question:
					"İslam'ın beş şartından biri olan 'Zekat' hangi amaçla verilir?",
				options: [
					"Yoksullara yardım etmek",
					"Hacca gitmek",
					"Oruç tutmak",
					"Namaz kılmak",
				],
				answerIndex: 0,
			},
			{
				id: 8,
				question: "İslam dininde kutsal sayılan ay hangisidir?",
				options: ["Recep", "Şaban", "Ramazan", "Muharrem"],
				answerIndex: 2,
			},
			{
				id: 9,
				question:
					"İslam'ın beş şartından biri olan 'Hac' hangi ayda gerçekleştirilir?",
				options: ["Receb", "Şaban", "Ramazan", "Dhul-hicce"],
				answerIndex: 3,
			},
			{
				id: 10,
				question: "İslam'da meleklerin başında kim vardır?",
				options: ["Mikail", "İsrafil", "Cebrail", "Azrail"],
				answerIndex: 2,
			},
		];

		setQuestions(questionsData);
	}, []);

	useEffect(() => {
		// burada, kullanıcının süresini her saniye azaltan bir interval oluşturabilirsiniz
		if (currentQuestionIndex === 0) {
			setTimer(0);
			setTimerInterval(
				setInterval(() => {
					setTimer((prevTimer) => prevTimer + 1);
				}, 1000)
			);
		}
	}, [currentQuestionIndex]);

	useEffect(() => {
		// burada, son soruya cevap verildiğinde, kullanıcının yanıtlarını kontrol edebilirsiniz
		if (currentQuestionIndex === questions.length) {
			clearInterval(timerInterval);
			const correctAnswers = userAnswers.filter((answer, index) => {
				return answer === questions[index].answerIndex;
			});
			const result = {
				correctAnswers: correctAnswers.length,
				totalQuestions: questions.length,
				time: timer,
			};
			console.log(result); // sonucu konsolda gösteriyoruz
		}
	}, [currentQuestionIndex]);

	const handleAnswer = (answerIndex) => {
		// burada, kullanıcının verdiği yanıtı state'e ekleyebilirsiniz
		const updatedUserAnswers = [...userAnswers];
		updatedUserAnswers[currentQuestionIndex] = answerIndex;
		setUserAnswers(updatedUserAnswers);

		// bir sonraki soruya geçmek için currentQuestionIndex'i artırın
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	};

	const renderQuestion = () => {
		// burada, soru verilerini kullanarak soru kartını oluşturabilirsiniz
		const question = questions[currentQuestionIndex];
		return (
			<View style={styles.questionContainer}>
				<Text style={styles.questionText}>{question.question}</Text>
				{question.options.map((option, index) => (
					<TouchableOpacity
						key={index}
						style={styles.optionButton}
						onPress={() => handleAnswer(index)}>
						<Text style={styles.optionText}>{option}</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{currentQuestionIndex === questions.length ? (
				<View style={styles.resultContainer}>
					<TouchableOpacity
						style={styles.optionButton}
						onPress={() => {
							setCurrentQuestionIndex(0);
							setUserAnswers([]);
						}}>
						<Text style={styles.optionText}>Restart</Text>
					</TouchableOpacity>
					<Text style={styles.resultText}>
						You answered{" "}
						{userAnswers.filter((answer) => answer !== undefined).length} out of{" "}
						{questions.length} questions correctly!
					</Text>
					<Text style={styles.resultText}>Time taken: {timer} seconds</Text>
				</View>
			) : (
				// burada, soruları gösteren bir bileşen oluşturabilirsiniz
				<View style={styles.quizContainer}>
					<Text style={styles.questionCountText}>{`Question ${
						currentQuestionIndex + 1
					} of ${questions.length}`}</Text>
					{renderQuestion()}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		paddingTop: 50,
	},
	quizContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	questionCountText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	questionContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	questionText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	optionButton: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginVertical: 10,
		width: "100%",
		alignItems: "center",
	},
	optionText: {
		fontSize: 16,
	},
	resultContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	resultText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
});

export default QuezScreen;
