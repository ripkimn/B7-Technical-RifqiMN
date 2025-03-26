import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import GlobalColors from '../constants/GlobalColors';
import Loading from '../components/Loading';
import {AuthContext} from '../context/auth-context';
import Header from '../components/Header';
import {formatDateToString} from '../utils/HelperMethod';
import {GetTasksByDate} from '../utils/APIMethod';
import Fallback from '../components/Fallback';
import TaskList from '../components/TaskList';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

function HomeScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [dateString, setDateString] = React.useState(formatDateToString(date));
  const [isFetching, setIsFetching] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function getTaskDate() {
        setIsFetching(true);
        try {
          const response = await GetTasksByDate(dateString);

          console.log('API Response:', response);
          if (response && Array.isArray(response)) {
            setData(response);
          } else {
            setData([]);
          }

          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setIsFetching(false);
        }
      }

      getTaskDate();
    }, [dateString]),
  );

  let content = <Fallback fallbackMessage="There's nothing here" />;

  if (data.length > 0) {
    content = <TaskList data={data} />;
  }

  if (isFetching) {
    content = (
      <View style={styles.loadingContainer}>
        <Loading title="Fetching data..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header title="Home" hideBackPress />
          <Text style={styles.titleText}>Today's Task</Text>
          {content}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginVertical: 16,
    fontSize: 16,
    fontWeight: '700',
  },
});
