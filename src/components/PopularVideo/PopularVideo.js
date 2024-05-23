import React, { useEffect, useState } from "react";
import styles from "./PopularVideo.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { getVideoById } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

const PopularVideo = ({ video }) => {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState({});

  useEffect(() => {
    dispatch(getVideoById(video.id)).then((result) => {
      setVideoInfor(result.payload.items[0].snippet);
    });
  }, [dispatch]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("thumbnails-wrapper")}>
        {videoInfor && (
          <img
            src={videoInfor.thumbnails.medium.url}
            alt="thumb-nail"
            className={cx("thumbnails")}
          />
        )}
      </div>
    </div>
  );
};

export default PopularVideo;
