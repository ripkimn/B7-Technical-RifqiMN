import {
  Text,
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import GlobalStyles from '../constants/GlobalStyles';
import GlobalColors from '../constants/GlobalColors';
import MaterialIcon from './MaterialIcon';

function Header({title, onBackPress, hideBackPress}) {
  return (
    <View style={styles.headerContainer}>
      {hideBackPress ? (
        <View style={styles.backButtonContainer}>
          <MaterialIcon
            name="arrow-back"
            size={16}
            color={GlobalColors.white}
          />
          <Text style={[styles.backButtonText, {color: GlobalColors.white}]}>
            Kembali
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButtonContainer}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <MaterialIcon name="arrow-back" size={16} />
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.backButtonContainer}>
        <MaterialIcon name="arrow-back" size={16} color={GlobalColors.white} />
        <Text style={[styles.backButtonText, {color: GlobalColors.white}]}>
          Kembali
        </Text>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 4,
    fontWeight: '500',
  },
});
