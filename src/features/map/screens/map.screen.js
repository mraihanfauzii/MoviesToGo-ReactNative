import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { TheatersContext } from "../../../services/theater/theater.context";
import { LocationContext } from "../../../services/location/location.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { theaters = [] } = useContext(TheatersContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

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
          return null;
        })}
      </Map>
    </>
  );
};
