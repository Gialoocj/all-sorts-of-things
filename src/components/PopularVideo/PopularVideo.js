import React, { useEffect, useState } from "react";
import styles from "./PopularVideo.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { getVideoById } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

const PopularVideo = ({ video }) => {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getVideoById(video.id)).then((result) => {
      setVideoInfor(result.payload.items[0].snippet);
      setLoading(false);
    });
  }, [dispatch]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("thumbnails-wrapper")}>
        {loading ? (
          <div className={cx("skeleton")}> </div>
        ) : (
          <img
            src={videoInfor?.thumbnails?.medium.url}
            alt="thumb-nail"
            className={cx("thumbnails")}
          />
        )}
      </div>
    </div>
  );
};

export default PopularVideo;
