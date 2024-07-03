import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator, NavigationTheme } from "./src/navigations";

const App = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
