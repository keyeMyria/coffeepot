import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

//ONLY FOR SCREEN TESTING
class Navigate extends Component {
    static navigationOptions = {
        title: 'Navigation',
        headerStyle: {
            backgroundColor: '#16a085'
            
        },
        headerTitleStyle: {
            color: '#ecf0f1'
        },
        headerBackTitle: null,
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ecf0f1'
                }}
            >
                {/* Delivery Legal */}
                <Button 
                    buttonStyle={{
                        margin: 10,
                        width: 200,
                        backgroundColor: '#1abc9c'
                    }}
                    title='Delivery Legal'
                    onPress={() => 
                        navigate('DeliveryLegal')
                    }
                />

                {/* Standard Legal */}
                <Button 
                    buttonStyle={{
                        margin: 10,
                        width: 200,
                        backgroundColor: '#1abc9c'
                    }}
                    title='Standard Legal'
                    onPress={() => 
                        navigate('StandardLegal')
                    }
                />

                {/* About */}
                <Button 
                    buttonStyle={{
                        margin: 10,
                        width: 200,
                        backgroundColor: '#1abc9c'
                    }}
                    title='About'
                    onPress={() => 
                        navigate('About')
                    }
                />

                {/* Settings */}
                <Button 
                    buttonStyle={{
                        margin: 10,
                        width: 200,
                        backgroundColor: '#1abc9c'
                    }}
                    title='Settings'
                    onPress={() => 
                        navigate('Settings')
                    }
                />
            </View>
        );
    }
}

export default Navigate;