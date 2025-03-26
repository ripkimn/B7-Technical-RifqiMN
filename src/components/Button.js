import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';

import GlobalColors from '../constants/GlobalColors';
import GlobalStyles from '../constants/GlobalStyles';

function Button({onPress, children, disabled, outline, loading}) {
  let content = (
    <Text style={[styles.buttonText, outline && styles.buttonTextOutline]}>
      {children}
    </Text>
  );

  if (loading) {
    content = (
      <ActivityIndicator
        size="small"
        color={outline ? GlobalColors.primaryColor : GlobalColors.white}
      />
    );
  }
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer,
        pressed && GlobalStyles.pressed,
        disabled && {backgroundColor: GlobalColors.grey50},
        outline && styles.buttonContainerOutline,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {content}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: GlobalColors.primaryColor,
    borderRadius: 4,
    marginVertical: 12,
  },
  buttonText: {
    color: GlobalColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainerOutline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: GlobalColors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GlobalColors.primaryColor,
    marginVertical: 12,
  },

  buttonTextOutline: {
    color: GlobalColors.primaryColor,
    fontSize: 16,
    fontWeight: '500',
  },
});
