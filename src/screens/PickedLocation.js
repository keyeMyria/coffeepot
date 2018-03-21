import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Modal, TouchableWithoutFeedback} from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as urlBuilder from '../utility/url_builder';

import { PRIMARY_COLOR, SECONDARY_COLOR, BUTTON_COLOR } from '../constants/style';

class PickedLocation extends Component {
    static navigationOptions = ({ navigation}) => ({
        title: navigation.state.params.headerTitle,
        headerStyle: {
            backgroundColor: PRIMARY_COLOR
            
        },
        headerTitleStyle: {
            color: SECONDARY_COLOR
        },
        headerTintColor: SECONDARY_COLOR,
        tabBarIcon: () => {
            return (
                <Icon
                    name="location-on"
                    type="material"
                    size={30}
                    color="grey"
                />
            );
        }
    });

    ///////////////////////////////////////////////////////////////////////////////
    // State currently contains the boolean for making the modal visible
    state = { modalVisible: false };

    ///////////////////////////////////////////////////////////////////////////////
    // When this is called, it will change the state for the modal depending on what is passed in as 'visible'
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Called in the mian render method, and will show when the state for modal is 'true'
    renderModal() {
        const { location, name, photos, place_id, distance } = this.props.places;
        // If there is a photo, render modal with a photo, else don't
        if(photos !== undefined) {
            const photoUrl = urlBuilder.buildPlacesPhotoUrl(photos[0].photo_reference)
            return (
                <Modal
                    visible={this.state.modalVisible}
                    animationType='fade'
                    transparent={true}
                    presentationStyle={'overFullScreen'}
                    
                >
                    <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                backgroundColor:'rgba(64,64,64,.7)'
                            }}
                        >
                            <View style={{backgroundColor:'white', padding: 10}}>
                                <Card
                                    image={{uri: photoUrl}}
                                    containerStyle={{height: 220}}
                                >
                                    <View style={styles.description}>
                                        <Text style={styles.bold}>{name}</Text>
                                        <View style = {styles.view_text}>
                                            <Text>{location}</Text>
                                            <Text>{distance.text}</Text>
                                        </View>
                                    </View>
                                </Card>

                                <View style={styles.bttn_view_style}>
                                    <Button
                                        title='Confirm'
                                        buttonStyle={styles.button_style}
                                    />
                                    <Button
                                        title='Go Back'
                                        buttonStyle={styles.button_style}
                                        onPress={() => {this.setModalVisible(false)}}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
        //--------------------If no photo is available-----------------------------
        return (
            <Modal
                visible={this.state.modalVisible}
                animationType='fade'
                transparent={true}
                presentationStyle={'overFullScreen'}
                
            >
                <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor:'rgba(64,64,64,.7)'
                        }}
                    >
                        <View style={{backgroundColor:'white', padding: 10}}>
                            <Card
                                title='No Photo For This Location'
                                containerStyle={{height: 140}}
                            >
                                <View style={styles.description}>
                                    <Text style={styles.bold}>{name}</Text>
                                    <View style = {styles.view_text}>
                                        <Text>{location}</Text>
                                        <Text>{distance.text}</Text>
                                    </View>
                                </View>
                            </Card>

                            <View style={styles.bttn_view_style}>
                                <Button
                                    title='Confirm'
                                    buttonStyle={styles.button_style}
                                />
                                <Button
                                    title='Go Back'
                                    buttonStyle={styles.button_style}
                                    onPress={() => {this.setModalVisible(false)}}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
    
    ///////////////////////////////////////////////////////////////////////////////
    // Main render method that will show the information of the selected coffee shop
    render() {
        const { location, name, photos, place_id, distance } = this.props.places;
        if(this.props.places!== null) {
            if(photos !== undefined) {
                const photoUrl = urlBuilder.buildPlacesPhotoUrl(photos[0].photo_reference)
                return (
                    <View style={styles.container}>
                        <Image
                            source={{uri: photoUrl}}
                            style = {styles.image_style}
                        />
                        <Text style={{fontWeight: 'bold'}} >{name}</Text>
                        
                        <Text>{location}</Text>
                        <Text>{distance.text}</Text>
                        <Button 
                            iconLeft={{
                                name: 'plus-circle',
                                type: 'material-community',
                                size: 25
                            }}
                            title='Create Coffee Pot'
                            buttonStyle={{backgroundColor: BUTTON_COLOR, width: 200}}
                            onPress={() => {this.setModalVisible(true)}}
                        />
                        {this.renderModal()}
                    </View>
                );
            }
        }
        //--------------------If no photo is available-----------------------------
        return(
            <View style={styles.container}>
                <Text>No Photo For This Location</Text>
                <Text style={{fontWeight: 'bold'}} >{name}</Text>
                
                <Text>{location}</Text>

                <Button 
                    iconLeft={{
                        name: 'plus-circle',
                        type: 'material-community',
                        size: 25
                    }}
                    title='Create Coffee Pot'
                    buttonStyle={{backgroundColor: BUTTON_COLOR, width: 200}}
                    onPress={() => {this.setModalVisible(true)}}
                />
                {this.renderModal()}
            </View>
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
// Styles Object
const styles = {
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    description: {
        alignContent: 'center'
    },
    view_text: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button_style: {
        backgroundColor: BUTTON_COLOR,
        marginTop: 10,
        width: 170,
    },
    bttn_view_style: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image_style: {
        margin: 10, 
        width: 350, 
        height: 250
    },
    bold: {
        fontWeight: 'bold'
    },
};

///////////////////////////////////////////////////////////////////////////////
// MapStateToProps
// places the data that we received from our action and reducers into a variable
function mapStateToProps({ places }) {
    // console.log('//////////places.selectedPlace///////////');
    // console.log(places.selectedPlace);
    return {
        places: places.selectedPlace
    };
}

export default connect(mapStateToProps, actions)(PickedLocation);

