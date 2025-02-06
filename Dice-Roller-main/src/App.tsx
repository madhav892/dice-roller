import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import DiceOne from '../assets/1.png';
import DiceTwo from '../assets/2.png';
import DiceThree from '../assets/3.png';
import DiceFour from '../assets/4.png';
import DiceFive from '../assets/5.png';
import DiceSix from '../assets/6.png';

type DiceProps = {
  imageUrl: ImageSourcePropType;
  animatedValue: Animated.Value;
};

const Dice = ({ imageUrl, animatedValue }: DiceProps): JSX.Element => {
  return (
    <Animated.View
      style={[
        styles.diceContainer,
        {
          transform: [
            { scale: animatedValue },
            {
              rotate: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '720deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Image source={imageUrl} style={styles.diceImage} />
    </Animated.View>
  );
};

const App = (): JSX.Element => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const [animatedValue] = useState(new Animated.Value(1));

  const rollDice = useCallback(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const diceImages = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];
    setDiceImage(diceImages[randomNumber - 1]);
  }, [animatedValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dice Roller</Text>
      <Dice imageUrl={diceImage} animatedValue={animatedValue} />
      <Pressable style={styles.button} onPress={rollDice}>
        <Text style={styles.buttonText}>Roll Dice</Text>
      </Pressable>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  diceContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diceImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;