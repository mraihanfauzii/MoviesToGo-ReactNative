import React from "react";
import { CompactTheaterInfo } from "../../../components/theater/compact-theater-info.component";

export const MapCallout = ({ theater }) => (
  <CompactTheaterInfo isMap theater={theater} />
);
