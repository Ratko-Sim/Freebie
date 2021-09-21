import React from "react";
import "./LatestAd.scss";
import { AiOutlineUser } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";

const LatestAd = ({ adInfo }) => {
  const { name, category, description, image, location, title } = adInfo;

  return (
    <div className="latestAdCard">
      <div className="latestAdImageContainer">
        <img src={image} alt="ad-img" />
      </div>
      <div className="latestAdInfo">
        <span className="latestAdCategory">{category}</span>
        <h4 className="latestAdTitle">{title}</h4>
        <div className="latestAdNameLocation">
          <div className="latestAdName">
            <AiOutlineUser size={15} style={{ color: "#df0161" }} />
            <span>{name}</span>
          </div>
          <div className="latestAdLocation">
            <IoLocationOutline size={15} style={{ color: "#df0161" }} />
            <span>{location}</span>
          </div>
        </div>

        <p className="latestAdNameDescription">{description}</p>
      </div>
    </div>
  );
};

export default LatestAd;
