import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import GlobalColors from '../constants/GlobalColors';

function Loading({title}) {
  return (
    <View>
      <ActivityIndicator size="large" color={GlobalColors.primaryColor} />
      <Text style={styles.loadingText}>{title}</Text>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: GlobalColors.primaryColor,
  },
});
