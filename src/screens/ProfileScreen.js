import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
} from 'react-native';

import GlobalColors from '../constants/GlobalColors';
import Header from '../components/Header';
import React from 'react';
import Button from '../components/Button';
import {AuthContext} from '../context/auth-context';

function ProfileScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);

  async function handleLogout() {
    authCtx.logout();
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Header title="Akun" onBackPress={() => navigation.goBack()} />
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/Profile.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={styles.profileText}>{authCtx.email}</Text>
            <Button onPress={handleLogout}>Logout</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: GlobalColors.white,
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: GlobalColors.grey50,
  },
  profileText: {
    marginVertical: 16,
    fontWeight: '700',
    fontSize: 16,
  },
});
