import React from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';
import Timer from "./Timer";

//generatl type screen
class generalTypeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Timer/>
      </View>
    );
  }
}

export default generalTypeScreen;
