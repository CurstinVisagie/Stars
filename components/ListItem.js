import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Animated, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../constants/Colors';
import StackService from '../services/stackService';
var globalStyles = require('../constants/styles');


const ListItem = ({ item, followed, blocked }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [newFollowedValue, setNewFollowedValue] = useState(followed);
  const [newBlockedValue, setNewBlockedValue] = useState(blocked);
  const posValue = new Animated.Value(0);
  const expandedPosValue = new Animated.Value(-20);

  const Follow = async () => {
    await StackService.AddFollow(item);
    setNewFollowedValue(true);
    setIsExpanded(false);
  }

  const UnFollow = async () => {
    await StackService.UnFollow(item);
    setNewFollowedValue(false);
    setIsExpanded(false);
  }

  const Block = async () => {
    await UnFollow();
    await StackService.AddBlock(item);
    setNewBlockedValue(true);
    setIsExpanded(false);
  }

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(posValue, {
        toValue: -20,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }
    else {
      Animated.timing(expandedPosValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }

  }, [isExpanded])

  return (
    <Animated.View style={[
      globalStyles.row,
      { transform: [{ translateX: isExpanded ? posValue : expandedPosValue }] },
      newBlockedValue ? styles.blocked : null
    ]}>
      <TouchableOpacity disabled={newBlockedValue ? true : false} style={styles.container} onPress={() => setIsExpanded(!isExpanded)}>
        <Image source={{ uri: item?.profile_image }} style={styles.photo}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>{item?.display_name}</Text>
          <Text style={styles.subTitle}>{item?.reputation}</Text>

        </View>
        {
          newFollowedValue ? <FontAwesomeIcon testID='follow-icon' style={styles.icon} icon="fa-star" color={Colors.accent} size={30} /> : null
        }
      </TouchableOpacity>
      {
        isExpanded ?
          <View style={globalStyles.row}>
            <TouchableOpacity onPress={() => !newFollowedValue ? Follow() : UnFollow()}>
              <FontAwesomeIcon style={styles.icon} icon={!newFollowedValue ? "fa-user-plus" : "fa-user-minus"} color={Colors.secondary} size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Block()}>
              <FontAwesomeIcon style={styles.icon} icon="fa-shield-halved" color='#ff6961' size={30} />
            </TouchableOpacity>
          </View>
          : null
      }
    </Animated.View >
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 7,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center"
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: "comfortaa"
    
  },
  subTitle: {
    color: Colors.secondary,
    fontFamily: "comfortaa"
  },
  icon: {
    marginHorizontal: 15,
  },
  blocked: {
    opacity: 0.5,
  }
});
