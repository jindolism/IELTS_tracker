import React from 'react';	
import { Button, Icon } from 'react-native-elements';	
import { View, StyleSheet } from 'react-native';
import * as storageUtil from '../src/Utils/storageUtil';
import GlobalVal from '../assets/global';

componentDidMount = () => {
  this._removeItemValue(GlobalVal.DB_FLAG);
  storageUtil._createTable();
};

 //select Test type screen - default	
class dashBoard extends React.Component {	
   render () {	
     const { navigation } = this.props;	
    return (	
      <View style={styles.container}>	
        <View style={styles.buttonWrapper}>	
        <Button
          icon={
            <Icon
              name="clock-o"
              size={20}
              color = "#278cd1"
              type='font-awesome'
            />
          }
          title=" Timer" 
          type="outline"
          titleStyle = {{fontSize: 23}}
          raised onPress={() => navigation.navigate('generalType')}/>	
      </View>	
      <View style={{height: 30}}></View>	
      <View style={styles.buttonWrapper}>	
        <Button
          icon={
            <Icon
              name="save"
              size={20}
              color="#278cd1"
              type='font-awesome'
            />
          }
          title=" SaveInfo"
          type="outline"
          titleStyle = {{fontSize: 23}}
          raised onPress={() => navigation.navigate('saveData', {
            isEditMode: true
          })}
        />
      </View>
      <View style={{height: 30}}/>
      <View style={styles.buttonWrapper}>	
        <Button 
          icon={
            <Icon
              name="list"
              size={20}
              color="#278cd1"
              type='font-awesome'
            />
          }
          title=" History" 
          type="outline"
          titleStyle = {{fontSize: 23}}
          raised onPress={() => navigation.navigate('scoreList')}/>
      </View>
    </View>	
    )	
  }	

  //to clean up existing AsyncStorage Value
  async _removeItemValue(key) {
    try {
      await AsyncStorage.clear();
      console.log("\n\nREMOVE AsyncStorage");
      return true;
    }
    catch(exception) {
      console.log("\n\nFail to REMOVE AsyncStorage : "+ exception);
      return false;
    }
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

 export default dashBoard;