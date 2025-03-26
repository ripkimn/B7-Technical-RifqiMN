import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL =
  'https://b7test-ca5bb-default-rtdb.asia-southeast1.firebasedatabase.app/';

export async function addUser(data) {
  const response = await axios.post(API_URL + `/users.json`, data);
  return response.data;
}

export async function addTask(data) {
  const response = await axios.post(API_URL + `/tasks.json`, data);
  return response.data;
}

export async function getLogin(email, password) {
  try {
    const response = await axios.get(API_URL + `/users.json`);

    if (!response.data) {
      return null;
    }

    const usersArray = Object.values(response.data);

    const user = usersArray.find(
      user => user.email === email && user.password === password,
    );
    console.log(user);
    return user || null;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function GetTasksByDate(date) {
  try {
    const response = await axios.get(API_URL + '/tasks.json');
    const responseData = response.data;

    const tasks = Object.keys(responseData).map(key => ({
      ...responseData[key],
    }));

    const tasksArray = Object.values(tasks);

    const filteredData = tasksArray.filter(item => item.date === date);

    return filteredData || null;
  } catch (error) {
    console.error('Error fetching reservations by date:', error);
    throw error;
  }
}
