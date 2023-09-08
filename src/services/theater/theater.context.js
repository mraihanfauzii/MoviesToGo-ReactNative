import React, { useState, useContext, createContext, useEffect } from "react";

import { theatersRequest, theatersTransform } from "./theater.service";

import { LocationContext } from "../location/location.context";

export const TheatersContext = createContext();

export const TheatersContextProvider = ({ children }) => {
  const [theaters, setTheaters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveTheaters = (loc) => {
    setIsLoading(true);
    setTheaters([]);

    setTimeout(() => {
      theatersRequest(loc)
        .then(theatersTransform)
        .then((results) => {
          setIsLoading(false);
          setTheaters(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveTheaters(locationString);
    }
  }, [location]);

  return (
    <TheatersContext.Provider
      value={{
        theaters,
        isLoading,
        error,
      }}
    >
      {children}
    </TheatersContext.Provider>
  );
};
