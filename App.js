import React from 'react';
import { Button } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import generalTypeScreen from './src/generalTypeScreen'; 

//navigation routes
const routes = createStackNavigator(
  { 
    generalType: { screen : generalTypeScreen } 
  },
  {
    initialRouteName: 'generalType',
  }
);

const App = createAppContainer(routes);

export default App ;
