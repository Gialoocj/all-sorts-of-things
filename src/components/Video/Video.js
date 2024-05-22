import React, { useEffect, useState } from "react";
import styles from "./Video.module.scss";
import classNames from "classnames/bind";
import { getVideoById } from "../../apiService/youtubeService";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const Video = ({ video }) => {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState();
  const [videoIdLisst, setVideoIdList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading
    dispatch(getVideoById(video.id.videoId)).then((result) => {
      setVideoInfor(result.payload.items[0].snippet);
      setLoading(false);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <div className={cx("skeleton")}></div>
      ) : (
        <div className={cx("thumbnail")}>
          <img src={videoInfor?.thumbnails.medium.url} alt="thumb-nail" />
        </div>
      )}
    </div>
  );
};

export default Video;
