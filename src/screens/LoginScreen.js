import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, FormInput} from '../components/components';
import GlobalColors from '../constants/GlobalColors';
import {validateEmail, validatePassword} from '../utils/HelperMethod';
import {getLogin} from '../utils/APIMethod';
import {AuthContext} from '../context/auth-context';

function LoginScreen({}) {
  const authCtx = React.useContext(AuthContext);
  const [form, setForm] = React.useState({email: '', password: ''});
  const [formError, setFormError] = React.useState({email: '', password: ''});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
    setFormError(prev => ({...prev, [field]: ''}));
  };

  async function handleLogin() {
    let errors = {email: '', password: ''};
    let isValid = true;

    if (!validateEmail(form.email)) {
      errors.email = 'Email tidak valid';
      isValid = false;
    }
    if (!validatePassword(form.password)) {
      errors.password = 'Password tidak valid';
      isValid = false;
    }

    setFormError(errors);

    if (isValid) {
      setIsLoading(true);
      const response = await getLogin(form.email, form.password);
      if (response) {
        await AsyncStorage.setItem('email', response.email);
        await AsyncStorage.setItem('password', response.password);
        await authCtx.login(response.email, response.password);
      } else {
        Alert.alert('Error', 'Email atau password tidak sesuai');
      }
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Masuk akun untuk memulai</Text>

      <FormInput
        icon="alternate-email"
        type="email"
        placeholder="masukkan email anda"
        value={form.email}
        onUpdateValue={value => handleInputChange('email', value)}
        error={formError.email}
      />
      <FormInput
        icon="lock-outline"
        secure
        placeholder="masukkan password anda"
        value={form.password}
        onUpdateValue={value => handleInputChange('password', value)}
        error={formError.password}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleLogin}
          disabled={Object.values(form).some(value => !value)}
          loading={isLoading}>
          Masuk
        </Button>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 28,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
  },
});
