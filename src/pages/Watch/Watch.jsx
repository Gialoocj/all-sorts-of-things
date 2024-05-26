// src/pages/Watch.js

import React from "react";
import { useLocation } from "react-router-dom";
import Film from "../Film";
import VideoSelected from "../WatchVideo/VideoSelected";

const Watch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const hasQuery = query.has("v");

  return hasQuery ? <VideoSelected /> : <Film />;
};

export default Watch;
