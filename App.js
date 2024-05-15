import { StatusBar, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/home";
import FavoritesPage from "./pages/favoritesPage";
import MovieDetails from "./pages/movieDetails";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
          text: "#fff",
        },
      }}
    >
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              opacity: 0,
            },
          }}
        >
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => (
              <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{
                  drawerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerTintColor: "white",
                  drawerActiveTintColor: "white",
                  drawerInactiveTintColor: "grey",
                  drawerItemStyle: {
                    marginVertical: 10,
                  },
                  drawerLabelStyle: {
                    fontWeight: "bold",
                    fontSize: 16,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                  },
                }}
              >
                <Drawer.Screen name="Home" component={HomePage} />
                <Drawer.Screen name="Favorites" component={FavoritesPage} />
              </Drawer.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="MovieDetails"
            options={{}}
            component={MovieDetails}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
