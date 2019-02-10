import React, { Component } from "react";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text, Platform } from 'react-native';
import GlobalVal from '../assets/global';


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

   render () {
     const { isRunning, isTimeout, elapsedTime, displayTime } = this.state;
    return (
      <View>
        <Text style = { styles.timerText }>{displayTime} </Text>
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
        </View>
      </View>
    )
  };

  /**
   *   This is function to reset timer.
   *   Upeate state time value to 60 (Temporal) will make Constant variable table and add
   **/
  _initTimer = () => {
    const { elapsedTime, isTimeout, isRunning } = this.state;
    console.log("Function Call : _initTimer()");
    // this._stopTimer();
    this.setState(prevState => {
      const newState = {
        ...prevState,
        //TODO : Do we need to stop if user tap Reset(?)
        // isRunning  : false,
        elapsedTime : GlobalVal.TEST_TIME, //TODO: GlobalVal.DEFAULT_SEC ,
        isTimeout : false,
        displayTime : this._timeConverter(GlobalVal.TEST_TIME), // TODO: this._timeConverter(GlobalVal.DEFAULT_SEC)
      }
      return { ...newState };
    });
    console.log("******* initTime call displayTime? after update state?");
    console.log("*** Current state value : elapsedTime - " + elapsedTime);
  };

  /**
   *  This is basic funtion to run timer
   **/
  _runningTimer = () => {
    const { elapsedTime, isRunning, isTimeout, timeInterval } = this.state;
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
       isRunning : true
    })

  }

  /**
   * May or Maynot move into timer function.
   **/
  _updateTime = () => {
    const {elapsedTime, isTimeout , isRunning } = this.state;
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
    const {isTimeout, isRunning, timeInterval , timeText} = this.state;
    console.log("#Function Call :  _stopTimer");
    console.log (" isRunning : " + isRunning);
    clearInterval(this.state.timeInterval);
     this.setState(prevState => {
      const newState = {
        ...prevState,
        isRunning : false,
        timeInterval : null,
      }
      return { ...newState };
    });
    return;
  }

  _displayTime = () =>{
    const { elapsedTime, displayTime } = this.state;
    console.log ("#Function Call : _displayTime");
    console.log("DisplayTime : elasedTime - " + elapsedTime);
    return this.setState({
      displayTime : this._timeConverter(elapsedTime)
   });
    console.log("displayTime : " + this.displayTime);
  }

  _timeConverter (time) {
    return this._digitUpdate(Math.floor(time/GlobalVal.BASE_TIME)) + ":" + this._digitUpdate(Math.ceil (time % GlobalVal.BASE_TIME));
  }

  _digitUpdate(num) {
    if(num > 9) return num;
    return '0'+ num;
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
      color : '#D3A4B3',
      //TODO: This is iOS font, i need to add Android edition
      fontFamily : 'Courier',
      fontSize: 150,
      flex : 2,
      alignItems:'center',
      justifyContent : 'center'
    }
});
