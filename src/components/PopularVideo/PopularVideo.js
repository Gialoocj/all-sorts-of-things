import React, { useEffect, useState } from "react";
import styles from "./PopularVideo.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { getChannelById, getVideoById } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

const PopularVideo = ({ video }) => {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getVideoById(video.id)).then((result) => {
      setVideoInfor(result.payload.items[0].snippet);
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChannelById(video.snippet.channelId)).then((result) => {
      setChannel(result.payload.items[0].snippet);
    });
  }, [dispatch]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("thumbnails-wrapper")}>
        {loading ? (
          <div className={cx("skeleton")}> </div>
        ) : (
          <div className={cx("channel-wrapper")}>
            <div className={cx("thumbnails-container")}>
              <img
                src={videoInfor?.thumbnails?.medium.url}
                alt="thumb-nail"
                className={cx("thumbnails")}
              />
            </div>

            <div className={cx("channel-info")}>
              <div className={cx("channel-image")}>
                <img src={channel?.thumbnails?.default.url} alt="channel" />
              </div>

              <div className={cx("title")}>
                <h3>{videoInfor?.title}</h3>
                <span>{channel?.title}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularVideo;
