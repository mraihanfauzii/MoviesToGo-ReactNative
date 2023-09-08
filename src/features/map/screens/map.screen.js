import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";
import { TheatersContext } from "../../../services/theater/theater.context";
import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { theaters = [] } = useContext(TheatersContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;
  console.log(theaters);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {theaters.map((theater) => {
          return (
            <Marker
              key={theater.name}
              title={theater.name}
              coordinate={{
                latitude: theater.geometry.location.lat,
                longitude: theater.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("TheaterDetail", { theater })
                }
              >
                <MapCallout theater={theater} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};
