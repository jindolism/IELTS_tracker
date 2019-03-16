import React from 'react';
import { View } from 'react-native';
import Timer from "./Timer";

//generatl type screen
class generalTypeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Timer onPress={this._openSaveData}/>
      </View>
    );
  }

  //passing data when navigate
  _openSaveData = endTime => {
    const { navigation } = this.props;
    console.log("###_OpenSaveData - time was : " + endTime);
    navigation.navigate('saveData', { time: endTime});
    navigation.navigate('isEditMode', { isEditMode: false});
  };


}

export default generalTypeScreen;
