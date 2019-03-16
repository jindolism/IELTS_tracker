import React from 'react';
import { Button, ButtonGroup, Input, Icon, Text } from 'react-native-elements';
import { View, AsyncStorage } from 'react-native';
import GlobalVal from '../assets/global';
import { NavigationActions, StackActions } from 'react-navigation';
import * as timeUtil from '../src/Utils/timeUtil';

//generatl type screen
class saveData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      saveTime : this.props.navigation.getParam('time'),
      examType : 0,
      examSubject : 0,
      correctAnswer : '',
      curTime : new Date().toLocaleString(),
      isEditMode : false,
      scoreInfos : {}
    }
    this.updateTypeIndex = this.updateTypeIndex.bind(this)
    this.updateSubjectIndex = this.updateSubjectIndex.bind(this)
  }
  //This is for updating exam type value when select exam Type
  updateTypeIndex (selectedTypeIndex) {
    this.setState({ examType : selectedTypeIndex })
  }
  //This is for updating exam type value when select exam Subject
  updateSubjectIndex (selectedSubjectIndex) {
    this.setState({ examSubject : selectedSubjectIndex })
  }

  //preload when open view
  componentDidMount = () => {
    const duration = this.props.navigation.getParam('time');
    const editMode = this.props.navigation.getParam('isEditMode');
    this.setState({ 
      saveTime : duration > 0 ? duration : 0,
      curTime : new Date().toLocaleString(),
      isEditMode : editMode ? editMode : false
    });
    this._retriveData();
  };

  render() {
    const { examType, examSubject, isEditMode, curTime, saveTime} = this.state;
    const examTypes = ['Academic', 'General'];
    const examSubjects = ['Reading', 'Writing'];
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Text h3>{curTime}</Text>
        {isEditMode ? 
          <Input
            placeholder='How long (sec)'
            keyboardType = {"number-pad"}
            maxLength={3}
            leftIcon={
              <Icon
                name='alarm'
                size={24}
                color='black'
              />
            }
            onChangeText = {(value) => {this.setState({saveTime: value})}}
            returnKeyType={"done"}
          />
          : <Text h5>{timeUtil._timeConverter(saveTime)}</Text>
        }
        <ButtonGroup
          onPress={this.updateTypeIndex}
          selectedIndex={examType}
          buttons={examTypes}
          containerStyle={{height: 40}}
        />
        <ButtonGroup
          onPress={this.updateSubjectIndex}
          selectedIndex={examSubject}
          buttons={examSubjects}
          containerStyle={{height: 40}}
        />
        {/* TODO: Need to add max value for input  : MAX : 40 */}
        <Input
          placeholder={"Correct Answer(optional)"} 
          keyboardType = {"number-pad"}
          maxLength={2}
          leftIcon={
            <Icon
              name='check-circle'
              size={24}
              color='black'
            />
          }
          onChangeText = {(value) => {this.setState({correctAnswer: value})}}
          returnKeyType={"done"}
        />  
        <Button
          icon = { <Icon name = 'save' size={40} color="black"/> }
          type  = "outline"
          onPress ={() =>  { this._addData() }}
        />
      </View>
    );
  }

  _retriveData = async() => {
    try { 
      const value = await AsyncStorage.getItem(GlobalVal.DB_FLAG);
      this.setState({scoreInfos : JSON.parse(value)});
      console.log("retriveData : " +  value);
    } catch(err){
      console.log(err);
    }
  }


  _addData = () =>{
    const { examType, examSubject, curTime, saveTime, correctAnswer } = this.state;
    this.setState(prevState => {
      console.log("Exam type : " + examType);
      console.log("subject : " + examSubject);
      console.log("time : " + curTime);
      console.log("Correct Answer: " + correctAnswer); 
      const newData = {
        [curTime] : {
            duration : saveTime,
            Type : examType,
            Subject : examSubject,
            saveTime : curTime,
            correctAnswer : correctAnswer
            
        }
      };
      const newState = {
        ...prevState,
        scoreInfos : {
          ...prevState.scoreInfos,
          ...newData
        }
      }
      this._saveStorage(newState.scoreInfos);
      return {...newState};
    })
  };

  

  _saveStorage  = values => {
    console.log("## save Item : \n " + values);
    AsyncStorage.setItem(GlobalVal.DB_FLAG, 
      JSON.stringify(values), () =>{
        AsyncStorage.getItem(GlobalVal.DB_FLAG, (err, result) => {
          console.log("ERROR WHEN LOAD DATA FROM ASYNCSTORAGE : " + err );
        });
      });
      
    this._resetNav();
  }

  //TODO : move this under general helper for navigation
  //This is the function to reset all stackedNavigation and back to hub
  _resetNav(){
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'dashBoard' })],
  }))
  
  }
}

export default saveData;
