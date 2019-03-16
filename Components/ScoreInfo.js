import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import images from '../assets/images';
import * as timeUtil from '../src/Utils/timeUtil';

const { width } = Dimensions.get("window");

export default class ScoreInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {duration, correctAnswer, type, subject, dateTime } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Image 
            style = {styles.photo} 
            source = {subject ===0 ? (images.readingIcon) : (images.writingIcon )} 
            resizeMode="contain"
          />
        </View>
        <View>
          <View style = {styles.column}>
            <Text style = {styles.title}> { dateTime ? dateTime : "DT" } </Text>
          </View>
          <View style = {styles.column}>
            <Text style = {styles.subtitle}> { Number.isInteger(type) ? (type === 0 ? "Academic" : "General") : "type"} </Text>
            <Text style = {styles.subtitle}> { correctAnswer ? correctAnswer : "CA" }</Text>
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
    fontSize: 20,
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
});