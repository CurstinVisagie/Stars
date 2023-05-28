import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

export default class LoadingComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        <ActivityIndicator size="large" color={Colors.blue}/>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.8,
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    justifyContent: "center"
  }
});
