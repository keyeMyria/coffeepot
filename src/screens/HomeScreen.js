import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    ImageBackground, 
    Image
} from 'react-native';
import { AppLoading, Asset } from 'expo';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { Spinner } from '../components/Spinner';
import CountDown from '../components/CountDown';
import HomeCoffeePot from '../components/HomeCoffeePot';
import * as actions from '../actions';

import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../constants/style';

///////////////////////////////////////////////////////////////////
//  Method taken from Expo documents
function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
}

class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Coffee Pot',
        headerStyle: {
            backgroundColor: PRIMARY_COLOR,
            paddingRight: 10,
            paddingLeft: 10
        },
        headerTitleStyle: {
            color: SECONDARY_COLOR,
            fontFamily: 'brush-script-mt',
            fontSize: 30
        },
        headerTintColor: SECONDARY_COLOR,
        headerBackTitle: null,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                <Icon 
                    type='material-community'
                    name='menu'
                    color='grey'
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('PlaceOrder')}>
                <Icon 
                    type='font-awesome'
                    name='coffee'
                    color='grey'
                />
            </TouchableOpacity>
        ),
        tabBarIcon: () => {
            return (
                <Icon
                    name="home" 
                    size={30} 
                    color="grey"
                /> 
            );
        },
    })

    ///////////////////////////////////////////////////////////
    //// State of current CoffeePot
    state = {
        isReady: false
    }

    componentWillMount() {
        const { currentUser } = firebase.auth();
        this.props.fetchMyCoffeePot(currentUser.uid);
    }

    ///////////////////////////////////////////////////////////////////
    //  Method taken from Expo documents
    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require('../images/CoffeePot-Logo-White-02.png'),
            require('../images/background.jpg')
        ]);

        await Promise.all([...imageAssets]);
    }

    onAddOrderPress = () => {
        const drinks = this.props.drinks + 1;
        this.props.addOrder(drinks);
        console.log(this.props.drinks);
    }

    renderRemoveBttn() {
        if(this.props.myCoffeePot != null) {
            return (
                <Button 
                    icon={{
                        name: 'cross',
                        type: 'entypo',
                        size: 30
                    }}
                    title='Cancel Coffee Pot'
                    buttonStyle={styles.button_style}
                    onPress={() => this.props.removeMyCoffeePot()}
                />
            );
        }
    }

    renderCoffeePot = () => {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground 
                style={{
                width: '100%',
                height: '100%',
            }}
            source={require('../images/background.jpg')}
            >
                <View style={{flex: 1}}>
                    <View style={{flex: 2, marginTop: 10}}>
                        <HomeCoffeePot />
                    </View>
                    <View style={{flex: 3, justifyContent: 'center'}}>
                        <Button 
                            icon={{
                                name: 'ios-navigate',
                                type: 'ionicon',
                                size: 30
                            }}
                            title='Track Delivery'
                            buttonStyle={styles.button_style}
                            onPress={() => navigate('TrackDelivery')}
                        />
                        <Button 
                            icon={{
                                name: 'message',
                                type: 'entypo',
                                size: 30
                            }}
                            title='Message Deliverer'
                            buttonStyle={styles.button_style}
                            onPress={() => navigate('MessageScreen')}
                        />
                        <Button 
                            icon={{
                                name: 'circle-with-plus',
                                type: 'entypo',
                                size: 30
                            }}
                            title='Add Another Drink'
                            buttonStyle={styles.button_style}
                            onPress={this.onAddOrderPress}
                        />
                        {this.renderRemoveBttn()}
                    </View>
                </View>
            </ImageBackground>
        );
    }

    // renderStartScreen = () => {
    //     return (
    //         <ImageBackground 
    //                     style={{
    //                         width: '100%',
    //                         height: '100%',
    //                     }}
    //                     source={require('../images/background.jpg')}
    //                     >
    //                     <View style={{ alignItems: 'flex-end', backgroundColor: 'transparent', marginRight: 30 }}>
    //                         <View style={{ transform: [{ rotate: '-45deg'}] }}>
    //                             <Icon 
    //                                 type='action'
    //                                 name='trending-flat'
    //                                 color='red'
    //                                 size={100}
    //                             />
    //                         </View>
    //                         <View style={{ marginRight: 30 }}>
    //                             <Text style={{ fontSize: 15, color: 'white' }}>
    //                                     Place an order
    //                             </Text>
    //                         </View>
    //                     </View>
    //                     <View style={styles.background}>
    //                         <View style={{ alignItems: 'center', marginTop: 100, marginBottom: 160 }}>
    //                             <Text style={{ fontSize: 25, color: 'white' }}>
    //                                 Haven't joined a Coffee Pot?
    //                             </Text>
    //                             <Text style={{ fontSize: 25, color: 'white' }}>
    //                                 Let's fix that!
    //                             </Text>
    //                         </View>
    //                     </View>
    //                     <View style={{ 
    //                             alignItems: 'flex-start', 
    //                             backgroundColor: 'transparent',   
    //                         }}>
    //                         <View style={{ marginLeft: 10 }}>
    //                             <Text style={{ fontSize: 15, color: 'white' }}>
    //                                     Join a Coffee Pot
    //                             </Text>
    //                         </View>
    //                         <View style={{ transform: [{ rotate: '45deg'}], marginLeft: 45 }}>
    //                             <Icon 
    //                                 type='action'
    //                                 name='trending-flat'
    //                                 color='red'
    //                                 size={100}
    //                             />
    //                         </View>
    //                     </View>
    //                 </ImageBackground>
    //     );
    // }

    render() {
        ///////////////////////////////////////////////////////////////////
        //  Method taken from Expo documents
        // if( !this.state.isReady || this.props.myCoffeePot === null) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //             <AppLoading 
        //                 startAsync={this._loadAssetsAsync}
        //                 onFinish={() => this.setState({ isReady: true })}
        //                 onError={console.warn}
        //             />
        //             <Spinner size="large"/> 
        //         </View>
        //     );
        // }
        // else {
        //     if ( this.state.alreadyStarted == true )
        //         return ( this.renderCoffeePot() );
        //     else
        //         return ( this.renderStartScreen() );
        //}

        return (
            <View>
                {this.renderCoffeePot()}
            </View>
        );


    }
}
const styles = {
    background: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    button_style: {
        backgroundColor: BUTTON_COLOR,
        borderRadius: 5,
        margin: 10,
    }
};

/////////////////////////////////////////////////////////
// Map redux reducers to component mapStateToProps
function mapStateToProps({ coffee }) {
    if(coffee.myCoffeePot === null) {
        return { myCoffeePot: null}
    }
    return {
        hasCoffeePot: coffee.hasCoffeePot,
        time: coffee.time,
        drinks: coffee.drinks,
        myCoffeePot: coffee.myCoffeePot
    };
}

export default connect(mapStateToProps, actions)(HomeScreen);