import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Acceuil from './Acceuil';
import Add from './Add';
import History from './History';
const Tab = createBottomTabNavigator();
export default function Dashboard() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 5,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            height: 65,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Icon name={iconName} size={28} color={focused ? '#007bff' : '#888'} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Acceuil}/>
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Add" component={Add} />
      </Tab.Navigator>
  );
}
