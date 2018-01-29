import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { GOOGLE_FIREBASE_CONFIG } from './src/constants/api_keys';

import Navigate from './src/screens/Navigate';
import Profile from './src/screens/Profile';
import GPSMap from './src/screens/GPSMap';

// CoffeePot Screens
import CoffeePotList from './src/screens/CoffeePotList';
import CoffeePot from './src/screens/CoffeePot';

// Delivery Screens
import ChooseDelivery from './src/screens/ChooseDelivery';
import ExistingOrdersList from './src/screens/ExistingOrdersList';
import ExistingOrder from './src/screens/ExistingOrder';
import PickLocationList from './src/screens/PickLocationList';
import PickedLocation from './src/screens/PickedLocation';

// Payment Screens
import ReceiptSnapshot from './src/screens/ReceiptSnapshot';

///////////////////////////////////////////////////////////
// YOU'RE CURRENTLY WORKING IN DEVELOPMENT BRANCH
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// YOU'RE CURRENTLY WORKING IN BRETT's BRANCH
///////////////////////////////////////////////////////////

export default class App extends React.Component {
  ////////////////////////////////////////////////////////////////////////
  // Upon loading app, initialize firebase
  componentWillMount() {
    firebase.initializeApp(GOOGLE_FIREBASE_CONFIG);
  }

  render() {
    const ButtonNav = StackNavigator({
      Navigate: { screen: Navigate },
      CoffeePotList: { screen: CoffeePotList },
      CoffeePot: { screen: CoffeePot },
      ExistingOrdersList: { screen: ExistingOrdersList },
      ExistingOrder: { screen: ExistingOrder },
      ChooseDelivery: { screen: ChooseDelivery },
      PickLocationList: { screen: PickLocationList },
      PickedLocation: { screen: PickedLocation },
      Profile: { screen: Profile },
      ReceiptSnapshot: { screen: ReceiptSnapshot },
      GPSMap: { screen: GPSMap }
    })

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
        />
        <ButtonNav />
      </View>
    );
  }
}

//////////////////////////////////////////////////////////////////////////////
// Style object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 25
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
});
