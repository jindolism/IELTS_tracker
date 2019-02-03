import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Timer from '../src/Timer';

//academic type screen
class academicTypeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Timer/>
      </View>
    );
  }
}

export default academicTypeScreen;
