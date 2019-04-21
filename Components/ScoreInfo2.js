import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import GlobalVal from '../assets/global';
import Moment from 'moment';
import * as timeUtil from '../src/Utils/timeUtil';

const { width } = Dimensions.get("window");

export default class ScoreInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {duration, correctAnswer, type, subject, dateTime } = this.props;
    Moment.locale('en-US');
    const date = Moment(dateTime, "YYYY-MM-DD");
    // console.log("\n\n ###IMPORTED DATA : " + JSON.stringify(this.props));
    return (
      <View style={styles.container}>
        <View style = {[styles.dateBackground, duration >= GlobalVal.DEFAULT_SEC ? styles.dateRedCircle : styles.dateBlueCircle]}>
          <Text style = {styles.month}>{ (date===null) ? "N/A" : date.format("MMM")}</Text>
          <Text style = {styles.day}>{ (date===null) ? "" : date.format("DD")}</Text>
        </View>
        <View>
          <View style = {styles.column}>
            <Text style = {styles.title}> { subject== 0 ? "Reading" : "Writing" } </Text>
          </View>
          <View style = {styles.column}>
            <Text style = {styles.subtitle}> { Number.isInteger(type) ? (type === 0 ? "Academic" : "General") : "type"} </Text>
            <Text style = {styles.subtitle}> { correctAnswer ? correctAnswer : "" }</Text>
            <Text style = {styles.subtitle}> { duration ? timeUtil._timeConverter(duration) : "dur"} </Text>
          </View>
        </View>
      </View>
    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: "row",
    alignItems: 'stretch',
    width: width-2,
    height : 30
  },
  title: {
    alignItems: 'center',
    fontSize: 30,
    fontWeight : "bold",
  },
  subtitle: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 20
  },
  dateBackground: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 3,
    alignItems : "center"
  },
  dateRedCircle : {
    borderColor: 'red'
  },
  dateBlueCircle : {
    borderColor: 'blue'
  },
  month: {
    fontSize : 20,
    alignItems:"center",
    padding : 0,
    marginTop : 5,
    marginBottom : -3,
    textAlignVertical: 'bottom'
  },
  day: {
    fontSize : 30,
    alignItems:"center",
    marginTop : 0,
    paddingTop : 0,
    textAlignVertical: 'top'
  } 
});