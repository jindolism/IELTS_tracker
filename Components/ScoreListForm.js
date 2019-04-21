import React, { Component } from "react";
import { View, FlatList } from 'react-native';
import ScoreInfo from '../Components/ScoreInfo2';
import * as storageUtil from '../src/Utils/storageUtil';
import { AppLoading } from "expo";

export default class ScoreListForm extends Component {
    constructor(props) {
      super(props);
    }

    state = {
        loadedScores : false,
        scoreInfos : []       
    }  

    componentDidMount = () => {
        console.log("\n\nSCORELISTFORM : LOAD INFO\n")
        this._loadScores(this.props.convSubject);
    };
    
    render() {
        const { loadedScores, scoreInfos } = this.state;
        if (!loadedScores) {
            return <AppLoading />;
          }
        else {
        return (
            <FlatList
                data= { scoreInfos ? Object.values(scoreInfos) : [] }
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent = {this._renderSeparator}
            />
            )
        }
    }

    //Individual Row items
    _renderItem = ({item}) => (
        <ScoreInfo
          duration={item.duration}
          correctAnswer={item.score}
          type={item.examType}
          subject={item.examSub}
          dateTime={item.date}
        />
    );
  
    _renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#CED0CE",
              marginLeft: "20%"
            }}
          />
        );
    };

    async _loadScores (convType) {
        try {
            const savedScore = await storageUtil._getDataBySubject(convType);
            console.log("\n -    LOADSCORES: DATA from Storage UTIL : " + savedScore); 
            const parsedInfos = JSON.parse(savedScore);
            console.log("GET ON test.js parsed DATA : " + JSON.stringify(parsedInfos)) 
            this.setState({ 
                loadedScores: true,
                scoreInfos: parsedInfos || []
            });
        } catch (err) {
            console.log(err);
        }
    };
}