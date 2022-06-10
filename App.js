import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import TouchId from 'react-native-touch-id';

export default function auth() {
  const [touch, setTouch] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fnTouchId = () => {
    setLoading(true);
    TouchId.authenticate('Por favor, se autentique!', {
      title: 'Autentique-se',
    })
      .then(res => {
        setTimeout(() => {
          setLoading(false);
          setTouch(res);
        }, 5000);
      })
      .catch(err => {
        setTimeout(() => {
          setLoading(false);
          setTouch(false);
        }, 5000);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#444"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#444"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fnTouchId}>
        <Text>Biometria</Text>
      </TouchableOpacity>
      <View style={{marginTop: 50}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{color: touch ? '#2a2' : '#a22'}}>
            {touch
              ? 'Leitura da biometria foi um sucesso!'
              : 'Erro na biometria.'}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19181f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
