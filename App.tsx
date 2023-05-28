import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faCreditCard, faGlobe, faInfoCircle, faPencil, faPhone, faPlus, faShieldHalved, faStar, faTrash, faUser, faUserMinus, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView, StatusBar } from 'react-native';

const App = () => {

  library.add(faShieldHalved, faStar, faUserPlus, faUserMinus ,faTrash, faPencil, faPlus, faXmark, faStar, faInfoCircle, faPhone, faGlobe, faCreditCard, faUser, faArrowLeft);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="default"
      />
      <AppNavigator />
    </SafeAreaView>
  );
}

export default App;
