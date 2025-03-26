import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

import GlobalColors from '../constants/GlobalColors';
import Loading from '../components/Loading';
import {AuthContext} from '../context/auth-context';
import Header from '../components/Header';
import {formatDateToString} from '../utils/HelperMethod';
import MaterialIcon from '../components/MaterialIcon';
import {GetTasksByDate} from '../utils/APIMethod';
import Fallback from '../components/Fallback';
import TaskList from '../components/TaskList';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

function CalendarScreen({navigation}) {
  const authCtx = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [dateString, setDateString] = React.useState(formatDateToString(date));
  const [hide, setHide] = React.useState(false);
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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Header title="Calendar" onBackPress={() => navigation.goBack()} />
        <View style={styles.calendarListContainer}>
          <View style={[styles.calendarContainer, hide && {height: 50}]}>
            <Calendar
              showSixWeeks={true}
              style={[styles.calendar, hide && {height: 0}]}
              theme={{
                todayTextColor: GlobalColors.primaryColor,
                arrowColor: GlobalColors.primaryColor,
                monthTextColor: GlobalColors.primaryColor,
              }}
              onDayPress={day => {
                setDate(new Date(day.dateString));
                setDateString(day.dateString);
              }}
              markedDates={{
                [dateString]: {
                  selected: true,
                  selectedColor: GlobalColors.primaryColor,
                },
              }}
            />
            <TouchableOpacity
              onPress={() => setHide(!hide)}
              style={styles.hideCalendarContainer}>
              <Text style={styles.calendarText}>
                {hide ? 'Show calendar' : 'Hide calendar'}
              </Text>
              <MaterialIcon
                name={hide ? 'expand-circle-down' : 'keyboard-arrow-up'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {content}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CalendarScreen;

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
  calendarListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  calendarContainer: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: GlobalColors.primaryColor,
    marginBottom: 24,
  },
  calendar: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  hideCalendarContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarText: {
    color: 'white',
    marginHorizontal: 4,
  },
});
