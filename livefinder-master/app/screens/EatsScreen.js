import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Screen from '../components/Screen'
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'
import tailwind from 'tailwind-react-native-classnames'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_APIKEY} from "@env";
import { setDestination} from '../redux/slices/navSlice'
import { useDispatch } from 'react-redux'

const EatsScreen = () => {
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date());
    const [dateN, setDateN] = useState('');
    const [mode,setMode]=useState('date');
    const [show,setShow]=useState(false);
    const [text,setText]=useState('');
    const dispatch = useDispatch();
    const [stationoriName, setoriStationName] = useState('');
    const [stationdesName, setdesStationName] = useState('');

  const extractoriStationName = (address) => {
    const parts = address.split('Railway')
  const name = parts[0].trim()
  setoriStationName(name)
  };
  const extractdesStationName = (address) => {
    const parts = address.split('Railway')
  const name = parts[0].trim()
  setdesStationName(name)
  };

    const onChange=(event,selectedDate)=>{
        const currentDate=selectedDate||date;
        setShow(false);
        if (mode === 'time' && currentDate < new Date()) {
            alert('Invalid time chosen')
            return
          }
        setDate(currentDate);
        let tempDate=new Date(currentDate);
        let fDate=tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
        let fTime='Hours: '+tempDate.getHours()+' | Minutes: '+tempDate.getMinutes();
        let fDaten=tempDate.getFullYear()+'-0'+(tempDate.getMonth()+1)+'-'+tempDate.getDate();
        //setText(tempDate)
        setDateN(fDaten)
        setText(fDate+'\n'+fTime)
    }
    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }

    return (
        <Screen style={tw`bg-white h-full justify-center`}>
            <TouchableOpacity
                style={[tailwind`bg-white p-3 rounded-full shadow-lg`, { top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                // style={}
                />
            </TouchableOpacity>
            <Text style={tailwind`text-center pb-5 text-xl font-bold`}>Welcome</Text>
            <View style={tailwind`border-t border-gray-100 flex-shrink relative z-20 bg-white`}>
                <View style={tailwind`bg-white pb-2`}>
                    <GooglePlacesAutocomplete
                        placeholder='Source Station?'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                loaction: details.geometry.location,
                                description: data.description
                            }));
                            extractoriStationName(data.description);
                        }}
                        minLength={2}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                    />
                    
                </View>
            </View>
            <View style={tailwind`border-t border-gray-100 flex-shrink relative z-20 bg-white`}>
                <View style={tailwind`bg-white pb-2`}>
                    <GooglePlacesAutocomplete
                        placeholder='Destination Station?'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        onPress={(data, details = null) => {
                            extractdesStationName(data.description);
                        }}
                        minLength={2}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                    />
                    
                </View>
            </View>
                
            <View style={styles.container}>
                <View style={{margin:10}}>
                    <Text>{text}</Text>
                    <Button title="Select Date"  onPress={()=>showMode('date')}/>
                </View>
                <View style={{margin:10}}>
                    <Button title="Select Time"  onPress={()=>showMode('time')}/>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        minimumDate={new Date()}
                        onChange={onChange}
                    />    
                )}
               
            </View>
            <View style={tailwind`mt-3 flex-row justify-evenly py-3 border-t border-gray-100`}>
                    <TouchableOpacity
                        style={tailwind`flex-row bg-black px-4 py-3 rounded-full border border-black`}
                        onPress={() => navigation.push('Trainlist', { data: {source: stationoriName, destination: stationdesName, date: dateN}})}
                    >
                        
                        <Text style={tailwind`text-white text-center`}>Submit</Text>
                    </TouchableOpacity>
                    {stationoriName ? (
                    <Text style={tailwind`mt-3 text-center text-gray-500`}>Station: {stationoriName}</Text>
                    ) : null}
                    {stationdesName ? (
                    <Text style={tailwind`mt-3 text-center text-gray-500`}>Station: {stationdesName}</Text>
                    ) : null}
            </View>
        </Screen>
    )
}

export default EatsScreen
const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }
})
const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    textInput: {
        fontSize: 15,
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        borderEndWidth: 1,
        borderColor: '#ddd'
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})



