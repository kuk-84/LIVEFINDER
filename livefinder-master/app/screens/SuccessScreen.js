import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import tw from 'tailwind-react-native-classnames';
import Constants from 'expo-constants'
import tailwind from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'
import { useSelector } from 'react-redux'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  });
const SuccessScreen = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation()
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const estimatedTravelTime = parseInt(data?.time); // Estimated travel time in minutes

    const targetHour = parseInt(data.hour); // Target hour in 24-hour format (2 PM)
    const targetMinute = parseInt(data.minute);

    // Calculate the target time in minutes
    const targetTimeInMinutes = targetHour * 60 + targetMinute;

    // Calculate the departure time in minutes
    const departureTimeInMinutes = targetTimeInMinutes - estimatedTravelTime;

    // Calculate the departure hour and minute
    let departureHour = Math.floor(departureTimeInMinutes / 60);
    let departureMinute = departureTimeInMinutes % 60;

    // Adjust the departure time if it's in the past
    if (departureHour < currentHour || (departureHour === currentHour && departureMinute <= currentMinute)) {
      departureHour = currentHour;
      departureMinute = currentMinute;
    }
    const departureHour12 = departureHour > 12 ? departureHour - 12 : departureHour;
    // Determine the meridiem (am/pm)
    const meridiem = departureHour >= 12 ? 'pm' : 'am';

    // Format the departure time with leading zeros
    const formattedDepartureHour = String(departureHour12).padStart(2, '0');
    const formattedDepartureMinute = String(departureMinute).padStart(2, '0');

    // Construct the departure time string
    const departureTime = `${formattedDepartureHour}:${formattedDepartureMinute} ${meridiem}`;
    
    const onClick = async () => {
      const scheduledTime = new Date();
      scheduledTime.setHours(departureHour, departureMinute, 0);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "livefinder",
            body: "Time to leave",
            data: { data: "data goes here" }
          },
          trigger: {
            date: scheduledTime
          }
        });
      }

    return (
        <Screen style={tw`bg-white h-full justify-center`}>
            <TouchableOpacity
                style={[tailwind`bg-white p-3 rounded-full shadow-lg`, { top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={() => navigation.navigate("Home")}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                />
            </TouchableOpacity>
            <View style={tw`self-center`}>
                <View style={tw`p-5 w-full `}>
                    <Image
                        source={require('../assets/car_animation.gif')}
                        style={tw`w-60 h-40`}
                    />
                </View>
                <View style={tw`p-5 text-center self-center`}>
                    <Text style={tw`font-bold text-lg mb-3 text-center`}>LET'S START</Text>
                    <Text style={tw`text-base text-center`}>Estimated time: {data?.time}</Text>
                    <Text style={tw`text-base text-center`}>Estimated distance: {data?.distance}</Text>
                    {/* <Text style={tw`text-base text-center`}>seconds: {h}</Text> */}
                    {/* <Text style={tw`text-base text-center`}>duration: {d}</Text> */}
                    <Text style={tw`text-base text-center`}>time to start: {departureTime}</Text>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={onClick}>
                            <Text style={{backgroundColor: 'black', padding: 10, color: 'white'}}>Click to notify</Text>
                        </TouchableOpacity>
                        <StatusBar style="auto" />
                    </View>
                </View>
            </View>
        </Screen>
    );
}

export default SuccessScreen;
const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });