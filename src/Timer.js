import React, { Component } from "react";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text, Platform, Alert } from 'react-native';
import GlobalVal from '../assets/global';
import * as timeUtil from '../src/Utils/timeUtil';

//select Test type screen - default
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning : false,
      isTimeout : false,
      elapsedTime : GlobalVal.TEST_TIME, //TODO: GlobalVal.DEFAULT_SEC,
      timeInterval: null,
      timeText : "",
      saveButton : true
    }
  };
  componentDidMount() {
    this._initTimer();
    this._displayTime();
  }

  /**
   *  This is tear down function to reset interval timer whenever user leave this view.
   *  To prevent useless interval running or Error, timer is reset regardless of users inquiry
   **/
  componentWillUnmount() {
    this._stopTimer();
  }


   _saveButtonClickded = () => {
    const { elapsedTime, isTimeout } = this.state;
    Alert.alert(
      "Save",
      "Are you sure to save?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Save",
         onPress: ()=> this.props.onPress(this._endTime())
        }
      ],
      { cancelable: false }
    );
  };

   render () {
     const { isRunning, isTimeout, displayTime, saveButton } = this.state;
    return (
      <View>
        <Text style = { [styles.timerText , isTimeout ? {color : "red"} : {color : "black"}] }>{displayTime} </Text>
        <View style = { styles.buttonRow }>
          <Button
           icon = {
             <Icon name = {isRunning ? 'pause' : 'play'}
              size={40}
              color={ isTimeout ? "red" : "black" } /> }
           type="outline"
           onPress = { isRunning ? this._stopTimer : this._runningTimer }
          />
          <Button
           icon = { <Icon name = 'history' size={40} color="black"/> }
            type  = "outline"
            onPress = { this._initTimer }
          />
           <Button
           icon = { <Icon name = 'save' size={40} color="black"/> }
            type  = "outline"
            disabled = { saveButton }
            onPress={this._saveButtonClickded}
          />
        </View>
      </View>
    )
  };

  /**
   *   This is function to reset timer.
   *   Upeate state time value to 60 (Temporal) will make Constant variable table and add
   **/
  _initTimer = () => {
    const { elapsedTime } = this.state;
    console.log("Function Call : _initTimer()");
    this.setState(prevState => {
      const newState = {
        ...prevState,
        //TODO : Do we need to stop if user tap Reset(?)
        // isRunning  : false,
        elapsedTime : GlobalVal.TEST_TIME, //TODO: GlobalVal.DEFAULT_SEC ,
        isTimeout : false,
        displayTime : timeUtil._timeConverter(GlobalVal.TEST_TIME), // TODO: timeUtil._timeConverter(GlobalVal.DEFAULT_SEC)
        saveButton : true
      }
      return { ...newState };
    });
    console.log("*** Current state value : elapsedTime : " + elapsedTime);
  };

  /**
   *  This is basic funtion to run timer
   **/
  _runningTimer = () => {
    const { isRunning, isTimeout, timeInterval } = this.state;
    console.log("Function Call : _runningTimer()");
    console.log(" - default Value - isRunning : " + isRunning + " isTimeout : " + isTimeout);

    //block to play multiple timeInterval
    if(isRunning || timeInterval != null) {
        console.log("_runningTimer : Already running");
        return;
    }

    console.log("_runningTimer : start interval");
    const startInterval = setInterval(() => {
        if(!isRunning){
          this._updateTime();
      }
    }, 1000);
    return this.setState({
       timeInterval : startInterval,
       isRunning : true,
       saveButton : true
    })

  }

  /**
   * May or Maynot move into timer function.
   **/
  _updateTime = () => {
    const {elapsedTime, isTimeout } = this.state;
    console.log("#Function Call : _updateTime ");
    console.log(" --- current elapsedTime : " + elapsedTime);
    if(elapsedTime == 0) {
      console.log("updateTime : elapsedTime is under 0");
      this.setState(prevState => {
        const newState = {
          ...prevState,
          isTimeout : true,
          elapsedTime : elapsedTime + 1
        }
        return { ...newState };
      });
    } else {
        if(isTimeout && elapsedTime >= GlobalVal.TEST_TIME /* TODO: GlobalVal.TIMEOUT */) {
          return  this._stopTimer();
        }
        this.setState(prevState => {
          console.log("updateTime : elapsedTime deduct");
          const newState = {
            ...prevState,
            elapsedTime : isTimeout ? elapsedTime + 1 : elapsedTime - 1,
          }
          console.log("updateTime is : " + newState.elapsedTime);
          return { ...newState };
        });
      }
      this._displayTime();
  }

  _stopTimer = () => {
    const { isRunning } = this.state;
    console.log("#Function Call :  _stopTimer");
    console.log (" isRunning : " + isRunning);
    clearInterval(this.state.timeInterval);
     this.setState(prevState => {
      const newState = {
        ...prevState,
        isRunning : false,
        timeInterval : null,
        saveButton : false
      }
      return { ...newState };
    });
    return;
  }

  _displayTime = () =>{
    const { elapsedTime } = this.state;
    console.log ("#Function Call : _displayTime");
    console.log("DisplayTime : elasedTime - " + elapsedTime);
    return this.setState({
      displayTime : timeUtil._timeConverter(elapsedTime)
   });
  }

  _endTime(){
    const {elapsedTime, isTimeout} = this.state;
    return isTimeout ? (GlobalVal.DEFAULT_SEC + elapsedTime) : (GlobalVal.DEFAULT_SEC - elapsedTime);
  }
}
//Style sheet
const styles = StyleSheet.create({
    buttonRow: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems : 'center'
    },

    timerText: {
      fontFamily : Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontSize: 150,
      flex : 2,
      alignItems:'center',
      justifyContent : 'center'
    }
});
