import React, { useState, useEffect } from "react";
import MapView, { Polygon }  from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";

const FirstTimeScreen = () => {
  const [location, setLocation] = useState({
    coords: {
      latitude: "37.78825",
      longitude: "-122.4324"
    }
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  if (errorMsg != null) {
    return <Text>{JSON.stringify(errorMsg)}</Text>;
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.mapStyle}
      >
      
      </MapView>
    </View>
  );
};

export default FirstTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
