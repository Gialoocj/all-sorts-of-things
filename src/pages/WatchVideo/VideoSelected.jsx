import React, { useEffect, useState } from "react";
import styles from "./VideoSelected.module.scss";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import {
  getVideoById,
  getPopularVideos,
} from "../../apiService/youtubeService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

import { WarningIcon, SearchIcon } from "../../components/icons/icons";
import { searchVideos, getChannelById } from "../../apiService/youtubeService";
import PopularVideo from "../../components/PopularVideo/PopularVideo";

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

  const convertView = (viewCount) => {
    if (viewCount)
      return viewCount
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  };

  const convertDate = (dateString) => {
    // Tạo đối tượng Date từ chuỗi ngày
    const date = new Date(dateString);
    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    // Trả về chuỗi theo định dạng ngày/tháng/năm
    return `${day} thg ${month}, ${year}`;
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
        setChannelInfo(result.payload.items[0]);
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

  useEffect(() => {
    dispatch(getPopularVideos()).then((result) => {
      setPopularVideos(result.payload.items);
      console.log(result);
    });
  }, []);

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
              <div className={cx("title")}>
                <span>{videoInfo?.localized.title}</span>
                <div className={cx("view-count")}>
                  <span>
                    {convertView(channelInfo?.statistics?.viewCount)} views
                  </span>
                  <span style={{ marginLeft: "12px" }}>
                    {convertDate(videoInfo?.publishedAt)}
                  </span>
                </div>
              </div>

              <div className={cx("channel")}>
                <div className={cx("channel-image")}>
                  <img
                    className={cx("image")}
                    src={channelInfo?.snippet?.thumbnails?.default.url}
                    alt="channel-avatar"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className={cx("channel-title")}>
                  <span className={cx("channel-name")}>
                    {videoInfo?.channelTitle}
                  </span>
                  <span className={cx("subcribers")}>
                    {channelInfo?.statistics?.subscriberCount} Subcribers
                  </span>
                </div>

                <button className={cx("btn_register")}>Register</button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("list-videos")}>
          {popularVideos.map((video) => {
            return (
              <div className={cx("item-video")}>
                <PopularVideo key={video.id} video={video} />;
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
