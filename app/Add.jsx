import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Glucose from './Glucose';
import Pressure from './Pressure';
import Weight from './Weight';

const Tab = createMaterialTopTabNavigator();
export default function Add() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          elevation: 4,
          height: 65,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Glucose') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Pressure') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Weight') {
            iconName = focused ? 'swap-vertical' : 'swap-vertical-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? '#007AFF' : '#8e8e93'}
              style={{ marginTop: 10 }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Glucose" component={Glucose} />
      <Tab.Screen name="Pressure" component={Pressure} />
      <Tab.Screen name="Weight" component={Weight} />
    </Tab.Navigator>
  );
}
