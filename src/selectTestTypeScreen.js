import React from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json


//select Test type screen - default
class selectTestTypeScreen extends React.Component {
   render () {
     const { navigation } = this.props;
    return (
      <View style={styles.container}>
         <View style={styles.buttonWrapper}>
          <Button title="General" raised onPress={() => navigation.navigate('generalType')}></Button>
       </View>
       <View style={{height: 30}}></View>
       <View style={styles.buttonWrapper}>
          <Button title="Academic" raised onPress={() => navigation.navigate('academicType')}></Button>
       </View>
    </View>
    )
  }
}

//Style sheet
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems : 'center'
    },
    buttonWrapper: {
      width: 200
    }
});

export default selectTestTypeScreen;
