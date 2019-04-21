import React from 'react';
import { Button, ButtonGroup, Input, Icon, Text } from 'react-native-elements';
import { View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import * as timeUtil from '../src/Utils/timeUtil';
import * as storageUtil from '../src/Utils/storageUtil';

//generatl type screen
class saveData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      saveTime : this.props.navigation.getParam('time'),
      examType : 0,
      examSubject : 0,
      correctAnswer : '',
      curTime : new Date().toISOString(),
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
      curTime : new Date().toISOString(),
      isEditMode : editMode ? editMode : false
    });
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
          placeholder={ examSubject === 0 ? "Correct Answer(optional)" : "N/A"} 
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
          editable = { examSubject === 0 ? true : false }
        />  
        <Button
          icon = { <Icon name = 'save' size={40} color="black"/> }
          type  = "outline"
          onPress ={() =>  { this._addData() }}
        />
      </View>
    );
  }


  _addData = () =>{
    const { examType, examSubject, curTime, saveTime, correctAnswer } = this.state;
    this.setState(prevState => {
      console.log("Exam type : " + examType);
      console.log("subject : " + examSubject);
      console.log("time : " + curTime);
      console.log("Correct Answer: " + correctAnswer); 
          
      storageUtil._addData(curTime, examType, examSubject, saveTime, correctAnswer);
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
      this._resetNav();
      return {...newState};
    })
  };


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
