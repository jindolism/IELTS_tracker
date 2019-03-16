import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import dashBoard from './src/dashBoard';
import generalTypeScreen from './src/generalTypeScreen';
import saveData from './src/saveData';
import scoreList from './src/scoreList';

//navigation routes
const routes = createStackNavigator(
  {
    dashBoard : { 
      screen : dashBoard,
      navigationOptions: {
        title: 'IELTS TRACKER',
        headerStyle: { backgroundColor: '#067dd8' },
        headerTintColor: '#ffffff',
      },
    },
    generalType: { 
      screen : generalTypeScreen,
      navigationOptions: {
        title: 'Timer',
        headerStyle: { backgroundColor: '#067dd8' },
        headerTintColor: '#ffffff',
      }, 
    },
    saveData : { 
      screen : saveData,
      navigationOptions: {
        title: 'Enter Detail Information',
        headerStyle: { backgroundColor: '#067dd8' },
        headerTintColor: '#ffffff',
      }, 
    } ,
    scoreList: {
      screen: scoreList,
      navigationOptions: {
        title: 'Scores',
        headerStyle: { backgroundColor: '#067dd8' },
        headerTintColor: '#ffffff',
      },
    }
  },
  {
    initialRouteName: 'dashBoard',
  }
);

const App = createAppContainer(routes);

export default App ;
