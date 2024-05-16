import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";


export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameOver(true);
    setGuessRounds(numberOfRounds)
  };

  const startNewGameHandler = () =>{
    setUserNumber(null);
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen gameOverHandler={gameOverHandler} userNumber={userNumber} />
    );
  }
  if (userNumber && gameOver) {
    screen = <GameOverScreen onStartNewGame={startNewGameHandler} userNumber={userNumber} roundNumber={guessRounds}/>;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
      // onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
