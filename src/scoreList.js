import React from 'react';
import { AsyncStorage, Text, View, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import { AppLoading } from "expo";
import GlobalVal from '../assets/global';
import ScoreInfo from '../Components/ScoreInfo';
import Icon from 'react-native-vector-icons/FontAwesome';

class scoreList extends React.Component {

    state = {
        loadedScores : false,
        scoreInfos : []       
    }

    componentDidMount = () => {
        this._loadScores();
    };
    
    render() {
        const { loadedScores, scoreInfos } = this.state;
        if (!loadedScores) {
          return <View><Text>Loading...</Text></View>;
        } 
        return (
            <View>
              <View>
                <Button
                  icon = { <Icon name = 'trash' size={40} color="black"/> }
                  type  = "outline"
                  onPress ={() =>  { this._resetStorage() }}
                />
              </View>
              <FlatList
                data= { scoreInfos ? Object.values(scoreInfos) : [] } //{this.state.scoreInfos} 
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.saveTime}
              />
            </View>
        )
    }

    _loadScores = async () => {
        try {
          const savedScore = await AsyncStorage.getItem(GlobalVal.DB_FLAG);
          const parsedInfos = JSON.parse(savedScore);
          this.setState({ 
            loadedScores: true,
            scoreInfos: parsedInfos || []
          });
        } catch (err) {
          console.log(err);
        }
      };

    _resetStorage = () => {
      console.log("RESET Storage");
      this.setState(prevState => {
        const newState = {
          ...prevState,
          scoreInfos : {}
        };
        AsyncStorage.setItem(GlobalVal.DB_FLAG, JSON.stringify(newState.scoreInfos));
        return { ...newState };
      });
    };

    //Individual Row items
    _renderItem = ({item}) => (
      <ScoreInfo
        duration={item.duration}
        correctAnswer={item.correctAnswer}
        type={item.Type}
        subject={item.Subject}
        dateTime={item.saveTime}
      />
    );

}
export default scoreList;