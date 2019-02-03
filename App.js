import React from 'react';
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import selectTestTypeScreen  from './src/selectTestTypeScreen';
import generalTypeScreen from './src/generalTypeScreen';
import academicTypeScreen from './src/academicTypeScreen';

//navigation routes
const routes = createStackNavigator(
  {
    selectTestType: { screen : selectTestTypeScreen },
    generalType: { screen : generalTypeScreen },
    academicType: { screen :academicTypeScreen }
  },
  {
    initialRouteName: 'selectTestType',
  }
);

const App = createAppContainer(routes);

export default App ;
