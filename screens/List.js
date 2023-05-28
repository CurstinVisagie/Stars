import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import StackService from '../services/stackService';
var globalStyles = require('../constants/styles');
import ListItem from '../components/ListItem';
import LoadingComponent from '../components/Loader';

const ListScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const Refresh = () => {
    StackService.get().then((response) => {
      if (response?.items?.length > 0) {
        setUsers(response.items);
        StackService.getFollowed().then((followed) => {
          setFollowedUsers(followed);
        });
        StackService.getBlocked().then((blocked) => {
          setBlockedUsers(blocked)
        })
      }
    })
  }

  useEffect(() => {
    Refresh()
  }, []);

  useEffect(() => {
    StackService.getBlocked().then((blocked) => {
      setBlockedUsers(blocked)
      StackService.getFollowed().then((followed) => {
        setFollowedUsers(followed);
        setLoading(false);
      });
    })
  }, [users]);

  const hasError = !loading && !users ? true : false;

  return (
    <View style={globalStyles.container}>

      {loading ? <LoadingComponent></LoadingComponent> : null}

      {
        hasError ?
          <View style={globalStyles.containerCenter}>
            <Text style={styles.errorText}>Error loading data</Text>
          </View>
          : null
      }

      {
        !hasError && !loading ?
          <>
            <Text style={globalStyles.pageTitle}>Top 20 StackOverflow Stars</Text>
            < FlatList
              refreshing={loading}
              onRefresh={Refresh}
              data={users}
              renderItem={({ item }) => <ListItem
                item={item}
                followed={followedUsers?.filter((e) => e.user_id === item.user_id).length > 0 ? true : false}
                blocked={blockedUsers?.filter((i) => i.user_id === item.user_id).length > 0 ? true : false} />}
              keyExtractor={item => item.user_id}
            />
          </>
          :
          null
      }



    </View>
  );

}

export default ListScreen;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: "comfortaa"
  }
});
