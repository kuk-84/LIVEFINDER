import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import tailwind from 'tailwind-react-native-classnames';
import tw from 'tailwind-react-native-classnames';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { RAILWAY_HOST_APIKEY } from "@env";
import { selectTravelTimeInformation } from '../redux/slices/navSlice'
import Screen from '../components/Screen';
import { useSelector } from 'react-redux'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});
const TrainSuccess = ({ route }) => {
  const {data} = route.params;
    const navigation = useNavigation()
    const trainno=data.trainNo;
    const trainname=data.trainName;
    const [selectedTrainData, setSelectedTrainData] = useState({});
  const [timeToReach, setTimeToReach] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  const onClick = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "livefinder",
          body: "Time to leave",
          data: { data: "data goes here" }
        },
        trigger: {
          seconds:1
        }
      });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          console.log('This will run after 3 second!')
          liveStatus()
        }, 3000);
        return () => clearTimeout(timer);
      }, []);


    const liveStatus = async () => {
    const URL = `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainno}&startDay=1`;
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': RAILWAY_APIKEY,
        'X-RapidAPI-Host': RAILWAY_HOST_APIKEY,
        },
    };
    
    try {
        const response = await fetch(URL, options);
        const y ={"data": {"a_day": 1, "ahead_distance": 0, "ahead_distance_text": "At station", "at_dstn": false, "at_src": false, "at_src_dstn": false, "avg_speed": 0, "cur_stn_sta": "15:56", "cur_stn_std": "15:57", "current_location_info": [{"deeplink": "", "hint": "Delay 13h:31m", "img_url": "", "label": "As of 11 hrs 6 mins ago", "message": "Arrived at FARIDABAD NEW TOWN~ at 05:27", "readable_message": "Arrived at faridabad new town at 05:27", "type": 1}, {"deeplink": "", "hint": "43 kms Covered so far", "img_url": "", "label": "As of 11 hrs 6 mins ago", "message": "4 kms to BALLABGARH", "readable_message": "4 kilometer to ballabgarh", "type": 3}, {"deeplink": "", "hint": "", "img_url": "", "label": "As of 11 hrs 6 mins ago", "message": "At station FARIDABAD NEW TOWN~", "readable_message": "At station faridabad new town", "type": 4}], "current_state_code": "HR", "current_station_code": "FDN", "current_station_name": "FARIDABAD NEW TOWN~", "data_from": "NA", "delay": 811, "destination": "PWL", "distance_from_source": 43, "eta": "05:27", "etd": "05:28", "instance_alert": 0, "ir_train_name": "SHAKURBASTI - PALWAL Express Special", "is_run_day": true, "is_ry_eta": true, "journey_time": 125, "late_update": true, "new_alert_id": 0, "new_alert_msg": "", "notification_date": "2023-04-30", "platform_number": 1, "previous_stations": [{"a_day": 0, "arrival_delay": 0, "distance_from_source": 0, "eta": "14:30", "etd": "14:30", "halt": 0, "non_stops": [Array], "platform_number": 1, "si_no": 1, "smart_city_id": 1005922, "sta": "14:30", "state_code": "DL", "station_code": "SSB", "station_lat": 28.6803473287, "station_lng": 77.1300315857, "station_name": "SHAKURBASTI", "std": "14:30", "stoppage_number": 1}, {"a_day": 0, "arrival_delay": 0, "distance_from_source": 4, "eta": "14:34", "etd": "14:35", "halt": 1, "non_stops": [Array], "platform_number": 2, "si_no": 2, "smart_city_id": null, "sta": "14:34", "state_code": "DL", "station_code": "DBSI", "station_lat": 28.667169, "station_lng": 77.17123, "station_name": "DAYA BASTI", "std": "14:35", "stoppage_number": 2}, {"a_day": 0, "arrival_delay": 0, "distance_from_source": 6, "eta": "14:37", "etd": "14:38", "halt": 1, "non_stops": [Array], "platform_number": 0, "si_no": 3, "smart_city_id": null, "sta": "14:37", "state_code": "DL", "station_code": "VVKP", "station_lat": 28.664458, "station_lng": 77.184062, "station_name": "VIVEKANAND PURI HALT", "std": "14:38", "stoppage_number": 3}, {"a_day": 0, "arrival_delay": 24, "distance_from_source": 7, "eta": "15:04", "etd": "15:05", "halt": 1, "non_stops": [Array], "platform_number": 0, "si_no": 4, "smart_city_id": 1005922, "sta": "14:40", "state_code": "DL", "station_code": "DKZ", "station_lat": 28.664232, "station_lng": 77.200756, "station_name": "DELHI KISHANGANJ", "std": "14:41", "stoppage_number": 4}, {"a_day": 0, "arrival_delay": 29, "distance_from_source": 10, "eta": "15:16", "etd": "15:17", "halt": 1, "non_stops": [Array], "platform_number": 1, "si_no": 5, "smart_city_id": 1005922, "sta": "14:47", "state_code": "DL", "station_code": "DSB", "station_lat": 28.658696, "station_lng": 77.216892, "station_name": "DELHI SADAR BAZAR", "std": "14:48", "stoppage_number": 5}, {"a_day": 0, "arrival_delay": 13, "distance_from_source": 11, "eta": "18:00", "etd": "15:23", "halt": 2, "non_stops": [Array], "platform_number": 1, "si_no": 6, "smart_city_id": 1005922, "sta": "15:08", "state_code": "DL", "station_code": "NDLS", "station_lat": 28.642464, "station_lng": 77.220154, "station_name": "NEW DELHI", "std": "15:10", "stoppage_number": 6}, {"a_day": 0, "arrival_delay": 16, "distance_from_source": 13, "eta": "15:29", "etd": "15:30", "halt": 1, "non_stops": [Array], "platform_number": 1, "si_no": 7, "smart_city_id": 1005922, "sta": "15:13", "state_code": "DL", "station_code": "CSB", "station_lat": 28.633651, "station_lng": 77.226162, "station_name": "SHIVAJI BRIDGE", "std": "15:14", "stoppage_number": 7}, {"a_day": 0, "arrival_delay": 16, "distance_from_source": 14, "eta": "15:33", "etd": "15:34", "halt": 1, "non_stops": [Array], "platform_number": 3, "si_no": 8, "smart_city_id": null, "sta": "15:17", "state_code": "DL", "station_code": "TKJ", "station_lat": 28.627473, "station_lng": 77.237835, "station_name": "TILAK BRIDGE", "std": "15:18", "stoppage_number": 8}, {"a_day": 0, "arrival_delay": 26, "distance_from_source": 19, "eta": "15:50", "etd": "15:51", "halt": 1, "non_stops": [Array], "platform_number": 4, "si_no": 9, "smart_city_id": 1005922, "sta": "15:24", "state_code": "DL", "station_code": "NZM", "station_lat": 28.58731, "station_lng": 77.254229, "station_name": "DELHI HAZRAT NIZAMUDDIN", "std": "15:25", "stoppage_number": 9}, {"a_day": 0, "arrival_delay": 29, "distance_from_source": 22, "eta": "16:00", "etd": "16:01", "halt": 1, "non_stops": [Array], "platform_number": 3, "si_no": 10, "smart_city_id": 1005922, "sta": "15:31", "state_code": "DL", "station_code": "OKA", "station_lat": 28.559722, "station_lng": 77.265215, "station_name": "OKHLA", "std": "15:32", "stoppage_number": 10}, {"a_day": 0, "arrival_delay": 54, "distance_from_source": 29, "eta": "16:33", "etd": "16:34", "halt": 1, "non_stops": [Array], "platform_number": 1, "si_no": 11, "smart_city_id": null, "sta": "15:39", "state_code": "DL", "station_code": "TKD", "station_lat": 28.512143, "station_lng": 77.294226, "station_name": "TUGLAKABAD", "std": "15:40", "stoppage_number": 11}, {"a_day": 0, "arrival_delay": 96, "distance_from_source": 39, "eta": "17:26", "etd": "17:27", "halt": 1, "non_stops": [Array], "platform_number": 1, "si_no": 12, "smart_city_id": 1005902, "sta": "15:50", "state_code": "HR", "station_code": "FDB", "station_lat": 28.411483, "station_lng": 77.307358, "station_name": "FARIDABAD", "std": "15:51", "stoppage_number": 12}], "related_alert": 0, "run_days": "MON,TUE,WED,THU,FRI,SAT,SUN", "seo_train_name": "Svdk Dli Special", "si_no": 13, "smart_city_id": 1005902, "source": "SSB", "spent_time": 0.017, "status": "A", "status_as_of": "As of 12 hrs 52 mins ago", "status_as_of_min": 772, "std": "2023-04-29 14:30", "stoppage_number": 13, "success": true, "total_distance": 69, "train_name": "SHAKURBASTI - PALWAL Express Special", "train_number": "04410", "train_start_date": "2023-04-29", "upcoming_stations": [[Object], [Object], [Object]], "update_time": "2023-04-30T05:27:00Z", "user_id": 0}, "message": "Success", "status": true, "timestamp": 1682858974683};
        
        const x = await response.json();
        console.log(x);
        setSelectedTrainData(x.data);
        console.log(x.data.previous_stations);
        const newMessage = x.data.new_message;
        console.log(newMessage);
        const foundDestinationStation = x.data.previous_stations
                ? x.data.previous_stations.find(station => station.station_code === data.destinationStationCode)
                : null;
            setDestinationStation(foundDestinationStation);
        //console.log(x);
        console.log(foundDestinationStation);
        
        
    } catch (error) {
        console.error(error);
    }
    };

useEffect(() => {
    if (selectedTrainData && data.destinationStationCode) {
      const destinationStation = selectedTrainData.previous_stations?.find(
        (station) => station.station_code === data.destinationStationCode
      );
      const eta = destinationStation?.eta;
      setTimeToReach(eta);
    }
  }, [selectedTrainData, data.destinationStationCode]);

  const getTimeDifference = () => {
    if (timeToReach && travelTimeInformation?.duration.text) {
      const [givenHours, givenMinutes] = timeToReach.split(":").map(Number);
      const currentTime = new Date();
      const givenTime = new Date();
      givenTime.setHours(givenHours);
      givenTime.setMinutes(givenMinutes);
  
      const durationText = travelTimeInformation.duration.text;
      const durationParts = durationText.split(" ").filter(part => !isNaN(part)).map(Number);
      let durationHours, durationMinutes;
      if (durationParts.length === 2) {
        [durationHours, durationMinutes] = durationParts;
      } else {
        durationMinutes = durationParts[0];
        durationHours = 0;
      }
  
      const timeDifference = givenTime.getTime() - currentTime.getTime() - durationHours * (1000 * 60 * 60) - durationMinutes * (1000 * 60);
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
      return { hoursDifference, minutesDifference };
    }
    return null;
  };

  const renderEstimatedArrivalTime = () => {
    if (timeToReach) {
      const { hoursDifference, minutesDifference} = getTimeDifference();
      const [departureHour, departureMinute] = timeToReach.split(":").map(Number);
      const departureHour12 = departureHour > 12 ? departureHour - 12 : departureHour;
      const meridiem = departureHour >= 12 ? 'pm' : 'am';
      const formattedDepartureHour = String(departureHour12).padStart(2, '0');
      const formattedDepartureMinute = String(departureMinute).padStart(2, '0');
      const departureTime = `${formattedDepartureHour}:${formattedDepartureMinute} ${meridiem}`;
      const now = new Date();
      now.setHours(now.getHours() + hoursDifference);
      now.setMinutes(now.getMinutes() + minutesDifference);
      const arrivalHour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
      const arrivalMinute = now.getMinutes();
      const arrivalMeridiem = now.getHours() >= 12 ? 'pm' : 'am';
      const formattedArrivalHour = String(arrivalHour).padStart(2, '0');
      const formattedArrivalMinute = String(arrivalMinute).padStart(2, '0');
      const arrivalTime = `${formattedArrivalHour}:${formattedArrivalMinute} ${arrivalMeridiem}`;
      return (
        <Text style={tw`text-base text-center`}>
          Distance from your loaction to {destinationStation.station_name} Railway Station: {travelTimeInformation?.distance?.text}{"\n"}
          Time to reach {destinationStation.station_name} Railway Station by road:{travelTimeInformation?.duration.text}{"\n"}
          Train arrival time at {destinationStation.station_name} Railway Station: {departureTime}{"\n"}
          Leave at {arrivalTime} from your home
</Text>
      );
    }
    return null;
  };

    

    return (
        <Screen style={tw`bg-white h-full justify-center`}>
            <TouchableOpacity
                style={[tailwind`bg-white p-3 rounded-full shadow-lg`, { top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={() => navigation.push('Home')}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                // style={}
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
                    <Text style={tw`font-bold text-lg mb-3 text-center`}>selected train: {trainname}</Text>
                {renderEstimatedArrivalTime()}
            </View>
            <View style={styles.container}>
                        <TouchableOpacity onPress={onClick}>
                            <Text style={{backgroundColor: 'black', padding: 10, color: 'white'}}>Click to notify</Text>
                        </TouchableOpacity>
                        <StatusBar style="auto" />
                    </View>
                </View>
            
        </Screen>
    )
}

export default TrainSuccess
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
