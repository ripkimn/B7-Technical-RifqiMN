import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';

import GlobalColors from '../constants/GlobalColors';

function TaskList({data}) {
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View>
        <Text style={styles.descText}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.taskID}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default TaskList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: GlobalColors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalColors.primaryColor,
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    color: GlobalColors.primaryColor,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: GlobalColors.grey100,
  },
  descText: {
    flex: 1,
    marginLeft: 8,
    textAlignVertical: 'center',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '500',
    color: GlobalColors.black,
  },
});
