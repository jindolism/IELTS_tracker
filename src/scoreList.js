import React from 'react';
import { View } from 'react-native';
import ScoreListForm from '../Components/ScoreListForm';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

class scoreList extends React.Component {
    render() {
      return (
        <ScrollableTabView
          style={{marginTop: 5, flex : 1, }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar activeTab={0} />}
        >
          <View tabLabel='WRITING'>
            <ScoreListForm convSubject = "1"/>
          </View>
          <View tabLabel='Reading'>
            <ScoreListForm convSubject = "0"/>
          </View>
        </ScrollableTabView>
      )
  }
}
export default scoreList;