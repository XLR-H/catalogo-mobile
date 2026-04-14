import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import colors from '../styles/colors';
import commonStyles from '../styles/commonStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const dispatch = useDispatch();

  function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha.');
      return;
    }

    setErro('');

    dispatch(
      loginSuccess({
        email: email.trim(),
      })
    );

    navigation.navigate('Products');
  }

  return (
    <View style={[commonStyles.screenContainer, styles.container]}>
      <View style={styles.loginCard}>
        <Text style={[commonStyles.title, styles.title]}>Catálogo Mobile</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <TextInput
          style={commonStyles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={commonStyles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

        <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  loginCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textLight,
    marginBottom: 24,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});