import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Screen from '../components/Screen';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/navSlice';


const HomeScreen = () => {
    const dispatch = useDispatch()

    return (
        <Screen style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
            <Image
                    source={require('../assets/livefinder.png') }
                    style={styles.logo}
                />
            <View style={tw`mb-5`}>
                    <GooglePlacesAutocomplete
                        placeholder='Your Location?'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        onPress={(data, details = null) => {
                            dispatch(setOrigin({
                                loaction: details.geometry.location,
                                description: data.description
                            }))
                            dispatch(setDestination(null))
                        }}
                        minLength={2}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={{
                            container: {
                                flex: 0,
                                
                            },
                            textInput: {
                                fontSize: 20,
                                backgroundColor: 'lightblue',
                                color: 'black'
                            }
                        }}
                        enablePoweredByContainer={false}
                    />
                </View>
                
                
                <NavOptions />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    
    logo: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
        marginBottom: 20,
        alignSelf: 'center'
    }
})

export default HomeScreen;
