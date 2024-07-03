import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens';

const stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <stack.Screen name="Home" component={HomeScreen} />
    </stack.Navigator>
  );
};

export default AppNavigator;
