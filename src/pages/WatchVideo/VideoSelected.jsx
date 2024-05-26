import React, { useEffect, useState } from "react";
import styles from "./VideoSelected.module.scss";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { getVideoById } from "../../apiService/youtubeService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

import { WarningIcon, SearchIcon } from "../../components/icons/icons";
import { searchVideos, getChannelById } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

const WatchVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const v = searchParams.get("v");
  const [result, setResult] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularVideos, setPopularVideos] = useState([]);
  const [videoInfo, setVideoInfo] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null);

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    if (!v) {
      return navigate("/error");
    }
    dispatch(getVideoById(v)).then((result) => {
      if (result.payload.pageInfo.totalResults === 0) {
        setResult(result.payload.pageInfo.totalResults);
      }

      setVideoInfo(result.payload.items[0].snippet);
      console.log(result);
    });
  }, [v]);

  useEffect(() => {
    if (v) {
      setSearchKey(v);
    }
  }, [v]);

  useEffect(() => {
    if (videoInfo) {
      dispatch(getChannelById(videoInfo.channelId)).then((result) => {
        setChannelInfo(result.payload.items[0].snippet);
        console.log(result);
      });
    }
  }, [videoInfo]);

  useEffect(() => {
    console.log(channelInfo);
  }, [channelInfo]);

  const searchVideo = () => {
    setLoading(true);
    dispatch(searchVideos(searchKey)).then((result) => {
      if (result.payload.items.length === 0) {
        return toast.error("Somethings went wrong");
      }
      setLoading(false);
      setVideos(result.payload.items);
      navigate(`/search?q=${searchKey}`);
    });
  };

  const url = `https://www.youtube.com/watch?v=${v}`;

  // useEffect(()=>{

  // })
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-wrapper")}>
        <div className={cx("search")}>
          <input
            type="text"
            onChange={handleInputChange}
            className={cx("input-search")}
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchVideo();
              }
            }}
          />
          <button className={cx("btn-search")} onClick={searchVideo}>
            <SearchIcon className={cx("search-icon")} />
          </button>
        </div>
      </div>
      <div className={cx("video-wrapper")}>
        <div className={cx("container")}>
          {result === 0 && (
            <div className={cx("notice-wrapper-skeleton")}>
              <div className={cx("notice")}>
                <WarningIcon className={cx("icon")} />
                <h1>This video has been deleted or does not exist</h1>
              </div>
              <div className={cx("skeleton")}>
                <div className={cx("channel-image-skeleton")}> </div>
                <div className={cx("channel-skeleton")}>
                  <div className={cx("title-skeleton")}></div>
                  <div className={cx("channel-title-skeleton")}> </div>
                </div>
              </div>
            </div>
          )}

          <div className={cx("notice-wrapper")}>
            <div className={cx("notice")}>
              <ReactPlayer
                className={cx("react-player")}
                style={{ borderRadius: "12px" }}
                url={url}
                width="100%"
                height="100%"
                controls={true}
                playing={true}
              />
            </div>
            <div className={cx("skeleton")}>
              <div className={cx("channel-image-skeleton")}>
                <img
                  className={cx("image")}
                  src={channelInfo?.thumbnails?.default.url}
                  alt="channel-avatar"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className={cx("channel-skeleton")}>
                <div className={cx("title")}>{videoInfo?.localized.title}</div>
                <div className={cx("channel-title")}>
                  {videoInfo.channelTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("list-videos")}>List</div>
      </div>
    </div>
  );
};

export default WatchVideo;
