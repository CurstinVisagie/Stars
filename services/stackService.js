import AsyncStorage from '@react-native-async-storage/async-storage';

var base_url = 'https://api.stackexchange.com/2.2/';

class StackService {

    static async get() {

        return fetch(base_url + 'users?pagesize=20&order=desc&sort=reputation&site=stackoverflow', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static async getFollowed() {
        const value = await AsyncStorage.getItem("followed");
        var toReturn = JSON.parse(value)
        return toReturn;
    }

    static async getBlocked() {
        const value = await AsyncStorage.getItem("blocked");
        var toReturn = JSON.parse(value)
        return toReturn;
    }

    static async AddFollow(data) {
        const value = await AsyncStorage.getItem("followed");
        var followed = JSON.parse(value)
        if (followed) {
            followed.push(data);
            await AsyncStorage.setItem("followed", JSON.stringify(followed));

        }
        else {
            var temp = [];
            temp.push(data);
            await AsyncStorage.setItem("followed", JSON.stringify(temp));
        }
    }

    static async UnFollow(data) {
        const value = await AsyncStorage.getItem("followed");
        var followed = JSON.parse(value)
        if (followed) {

            var index = followed.findIndex((e) => e.user_id === data.user_id);
            if (index > -1) {
                followed.splice(index, 1);
                await AsyncStorage.setItem("followed", JSON.stringify(followed));
            }
        }
    }

    static async AddBlock(data) {
        const value = await AsyncStorage.getItem("blocked");
        var blocked = JSON.parse(value)
        if (blocked && blocked.length > 0) {
            console.log("existing blocked found")
            blocked.push(data);
            await AsyncStorage.setItem("blocked", JSON.stringify(blocked));

        }
        else {
            var temp = [];
            temp.push(data);
            await AsyncStorage.setItem("blocked", JSON.stringify(temp));
        }
    }
}

export default StackService;