import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import GlobalColors from '../constants/GlobalColors';
import MaterialIcon from './MaterialIcon';

function FormInput({
  label,
  placeholder,
  onUpdateValue,
  secure,
  type,
  icon,
  textInputConfig,
  error,
  value,
  disable,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isSecure, setIsSecure] = React.useState(secure);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(!!value.trim());
  const toggleSecure = () => setIsSecure(prev => !prev);

  return (
    <View style={styles.rootContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.form}>
        <View style={styles.icon}>
          <MaterialIcon
            name={icon ? icon : 'person'}
            type="material"
            color={
              isFocused || value ? GlobalColors.black : GlobalColors.grey50
            }
            size={16}
          />
        </View>
        <TextInput
          style={[
            styles.input,
            {
              color:
                isFocused || value ? GlobalColors.black : GlobalColors.grey50,
            },
            {
              fontWeight: value ? '500' : '400',
            },
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={GlobalColors.grey50}
          secureTextEntry={isSecure}
          cursorColor={GlobalColors.black}
          selectionColor={GlobalColors.black}
          autoCapitalize="none"
          keyboardType={type ? type : 'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={text => {
            onUpdateValue?.(text);
          }}
          editable={!disable}
          selectTextOnFocus={!disable}
          {...textInputConfig}
        />
        {secure && (
          <TouchableOpacity
            onPress={toggleSecure}
            style={styles.icon}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialIcon
              name={isSecure ? 'visibility-off' : 'visibility'}
              type="material"
              color={
                isFocused || value ? GlobalColors.black : GlobalColors.grey50
              }
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default FormInput;

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 12,
  },
  form: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: GlobalColors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GlobalColors.grey50,
    paddingHorizontal: 12,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  label: {
    fontWeight: '500',
    color: GlobalColors.black,
    marginBottom: 8,
  },
  errorText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '400',
    color: GlobalColors.primaryColor,
    marginTop: 8,
  },
});
