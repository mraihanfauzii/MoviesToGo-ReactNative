import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const theatersRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const theatersTransform = ({ results = [] }) => {
  const mappedResults = results.map((theater) => {
    theater.photos = theater.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...theater,
      address: theater.vicinity,
      isOpenNow: theater.opening_hours && theater.opening_hours.open_now,
      isClosedTemporarily: theater.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
