import React, { useEffect, useState } from "react";
import styles from "./Videos.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getVideoById } from "../../apiService/youtubeService";
import Video from "../../components/Video/Video";
import { MenuIcon, SearchIcon } from "../../components/icons/icons";
import {
  searchVideos,
  getPopularVideos,
} from "../../apiService/youtubeService";
import PopularVideo from "../../components/PopularVideo/PopularVideo";
import { useParams, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const Videos = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  useEffect(() => {
    setSearchKey(q);
  }, [q]);

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  const searchVideo = () => {
    setLoading(true);
    dispatch(searchVideos(searchKey)).then((result) => {
      if (result.payload.items.length === 0) {
        return toast.error("Somethings went wrong");
      }
      setLoading(false);
      setVideos(result.payload.items);
      toast.success("Get list video success");
      console.log(result);
    });
  };

  const selectedVideoToWatch = (videoId) => {
    window.location.href = `/watch?v=${videoId}`;
  };

  useEffect(() => {
    setLoading(true);
    dispatch(searchVideos(q)).then((result) => {
      setVideos(result.payload.items);
      // console.log(result.payload.items);
      setLoading(false);
      console.log(result);
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-wrapper")}>
        <div className={cx("search")}>
          <input
            type="text"
            onChange={handleInputChange}
            className={cx("input-search")}
            placeholder="Search"
            value={searchKey}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search?q=${searchKey}`;
              }
            }}
          />
          <button className={cx("btn-search")} onClick={searchVideo}>
            <SearchIcon className={cx("icon")} />
          </button>
        </div>
      </div>

      <div className={cx("content")}>
        {loading ? (
          <div className={cx("loader-wrapper")}>
            <div className={cx("loader")}> </div>
          </div>
        ) : (
          <>
            {videos?.map((video) => {
              return (
                <div
                  className={cx("video-item")}
                  onClick={() => selectedVideoToWatch(video.id.videoId)}
                >
                  <Video video={video} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Videos;

// import React from "react";

// const Videos = () => {
//   return <div>Videos</div>;
// };

// export default Videos;
