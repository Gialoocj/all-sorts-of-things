import React, { useEffect, useState } from "react";
import styles from "./Video.module.scss";
import classNames from "classnames/bind";
import { getVideoById } from "../../apiService/youtubeService";
import { useDispatch } from "react-redux";
import { getChannelById } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

const Video = ({ video }) => {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState();
  const [channel, setChannel] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading
    dispatch(getVideoById(video.id.videoId)).then((result) => {
      setVideoInfor(result.payload.items[0].snippet);
      console.log(videoInfor);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(getChannelById(video.snippet.channelId)).then((result) => {
      setChannel(result.payload.items[0].snippet);
      console.log(result);
    });
    // console.log(video);
  }, [video]);

  return (
    <div className={cx("wrapper")}>
      {loading ? (
        <div className={cx("skeleton")}></div>
      ) : (
        <div className={cx("thumbnail")}>
          <div className={cx("thumbnail-wrapper")}>
            <img src={videoInfor?.thumbnails.medium.url} alt="thumb-nail" />
          </div>

          <div className={cx("channel-content")}>
            <h3>{videoInfor?.title}</h3>

            <div className={cx("channel-infor")}>
              <div className={cx("img-wrapper")}>
                <img src={channel?.thumbnails.medium.url} alt="thumb-nail" />
              </div>
              <span>{channel?.title}</span>
            </div>

            <p>{videoInfor?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
