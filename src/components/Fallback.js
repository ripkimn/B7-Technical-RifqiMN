import {View, Text, StyleSheet} from 'react-native';

import GlobalColors from '../constants/GlobalColors';

function Fallback({fallbackMessage}) {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        {fallbackMessage ? fallbackMessage : 'Fallback Message'}
      </Text>
    </View>
  );
}

export default Fallback;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '700',
    color: GlobalColors.primaryColor,
  },
});
