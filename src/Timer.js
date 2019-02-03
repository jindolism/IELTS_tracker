import React, { Component } from "react";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text } from 'react-native';


//select Test type screen - default
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning : false,
      isTimeout : false,
      elapsedTime : 60,
      timeInterval: null
    }
  };

/**
 *  This is tear down function to reset interval timer whenever user leave this view.
 *  To prevent useless interval running or Error, timer is reset regardless of users inquiry
 **/
  componentWillUnmount() {
    this._stopTimer();
  }

   render () {
     const { isRunning, isTimeout, elapsedTime } = this.state;
    return (
      <View>
        <Text style = { styles.timerText }>{elapsedTime} </Text>
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
          icon = {<Icon name = 'history' size={40} color="black"/> }
            type  = "outline"
            onPress = {this._initTimer }
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
        elapsedTime : 60,
        //TODO : Do we need to stop if user tap Reset(?)
        // isRunning  : false
      }
      return { ...newState };
    });
  };

  /**
   *  This is basic funtion to run timer
   **/
  _runningTimer = () => {
    const { elapsedTime, isRunning, isTimeout, timeInterval } = this.state;
    console.log("Function Call : _runningTimer()");
    console.log(" - default Value - isRunning : " + isRunning + " isTimeout : " + isTimeout);

    //block to play multiple timeInterval
    if(isRunning) {
        console.log("_runningTimer : Already running");
    }
    //TODO PART2 : will remove whenever finish overtime Function
    if(isTimeout) {
      clearInterval(timeInterval);
    }

    if(timeInterval != null){
      console.log("Timer is already running!")
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
    if(elapsedTime <= 0) {
      console.log("updateTime : elapsedTime is under 0");
      this.setState(prevState => {
        const newState = {
          ...prevState,
          isTimeout : true,
          isRunning : false
        }
        //TODO PART2 : This is temporal call for stop Timmer.
        //This function will be replaced by increase time in Red font
        this._stopTimer();
        return { ...newState };
      });
    } else {
      this.setState(prevState => {
        console.log("updateTime : elapsedTime deduct");
        const newState = {
          ...prevState,
          elapsedTime : elapsedTime - 1
        }
        console.log("updateTime is : " + newState.elapsedTime);
        return { ...newState };
      });
    }

  }

  _stopTimer = () => {
    const {isTimeout, isRunning, timeInterval } = this.state;
    console.log("###start _stopTimer function");
    console.log (" isRunning : " + this.isRunning);
    clearInterval(this.state.timeInterval);
     this.setState(prevState => {
      const newState = {
        ...prevState,
        isRunning : false,
        timeInterval : null
      }
      return { ...newState };
    });
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
      fontSize: 200,
      flex : 2,
      alignItems:'center',
      justifyContent : 'center'
    }
});
