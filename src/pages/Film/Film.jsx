import React, { useEffect, useState } from "react";
import styles from "./Film.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getVideoById } from "../../apiService/youtubeService";
// import Video from "../../components/Video/Video";
import { MenuIcon, SearchIcon } from "../../components/icons/icons";
import { searchVideos } from "../../apiService/youtubeService";

const cx = classNames.bind(styles);

function Video({ video }) {
  const dispatch = useDispatch();
  const [videoInfor, setVideoInfor] = useState();
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
}

const Film = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-wrapper")}>
        <div className={cx("search")}>
          <input
            type="text"
            onChange={handleInputChange}
            className={cx("input-search")}
          />
          <button className={cx("btn-search")}>
            <SearchIcon className={cx("icon")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Film;
