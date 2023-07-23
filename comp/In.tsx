import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';

const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(4, 'should be grater than 4')
    .max(16, 'shoudl be lesser than 16 char'),
});

//
export default function In() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [numbers, setNum] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let charList = '';

    const upperCaseChars = 'ABCEDFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcedfghijklmnopqrstuwsxyz';
    const digitalChars = '0987654321';
    const specailChar = '!@#$%^&*()_+';

    if (upperCase) {
      charList += upperCaseChars;
    }
    if (lowerCase) {
      charList += lowerCaseChars;
    }
    if (numbers) {
      charList += digitalChars;
    }
    if (symbol) {
      charList += specailChar;
    }

    const passwordResult = createpassword(charList, passwordLength);

    setPassword(passwordResult);
    setIsGenerated(true);
  };
  const createpassword = (char: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * char.length);
      result += char.charAt(charIndex);
    }
    return result;
  };

  const reset = () => {
    setIsGenerated(false);
    setSymbol(false);
    setPasswordLength(0);
    setPassword('');
    setLowerCase(false);
    setUpperCase(false);
    setNum(false);
  };

  const renderOutput = () => {
    if (password !== '') {
      return (
        <View style={[styles.output]}>
          <Text style={styles.password}>{password}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.took}>
        <Text style={styles.text}>Enter password length</Text>
        <TextInput
          style={styles.input}
          placeholder="Pass len"
          keyboardType="number-pad"
          value={String(passwordLength)}
          onChange={event => setPasswordLength(Number(event.nativeEvent.text))}
        />
      </View>
      <View>
        <View style={styles.checkBox}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            Include upperCase{' '}
          </Text>
          <BouncyCheckbox
            isChecked={upperCase}
            fillColor="#FF6666"
            unfillColor="white"
            onPress={() => {
              setUpperCase(!upperCase);
            }}
          />
        </View>
        <View style={styles.checkBox}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            Include Lowercase
          </Text>
          <BouncyCheckbox
            isChecked={lowerCase}
            fillColor="#FF6666"
            unfillColor="white"
            onPress={() => {
              setLowerCase(!lowerCase);
            }}
          />
        </View>
        <View style={styles.checkBox}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Include symbol</Text>
          <BouncyCheckbox
            isChecked={numbers}
            fillColor="#FF6666"
            unfillColor="white"
            onPress={() => {
              setNum(!numbers);
            }}
          />
        </View>
        <View style={styles.checkBox}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>
            Include specailCharacters
          </Text>
          <BouncyCheckbox
            isChecked={symbol}
            fillColor="#FF6666"
            unfillColor="white"
            onPress={() => {
              setSymbol(!symbol);
            }}
          />
        </View>
      </View>
      <View style={styles.btn}>
        <Button
          title="Generate password"
          onPress={() => {
            generatePasswordString(passwordLength);
          }}
        />
        <Button title="Reset password" onPress={reset} />
      </View>

      {renderOutput()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    marginTop: 50,
    // marginLeft: 30,
    paddingLeft: 30,
    elevation: 9,
    justifyContent: 'space-evenly',
    backgroundColor: '#CAD5E2',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 38,
    paddingVertical: 5,
  },
  input: {
    width: 100,
    marginHorizontal: 5,
    fontSize: 17,
    height: 40,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 3,
    marginRight: 38,
    marginVertical: 29,
  },
  took: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 9,
  },
  output: {
    borderWidth: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 90,
    height: 200,
  },
  password: {
    fontSize: 39,
    padding: 8,
    margin: 9,
    color: 'white',
  },
});
