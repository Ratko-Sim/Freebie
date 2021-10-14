import React, {useState } from "react";
import { NavLink } from "react-router-dom";
import "./UserNavBar.scss";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSendPlaneLine } from "react-icons/ri";
import { BsLayers } from "react-icons/bs";

const UserNavBar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [avatar, setAvatar] = useState(false)
  return (
    <nav className="userNavbar">
      <div className="userInfo">
        <div className="userImage">
          <img src={avatar ? avatar : user?.result.avatar} alt="profile"/>
        </div>
        <div className="userName">{`Hello ${user?.result.firstName}`}</div>
      </div>

      <ul className="userSectionLinks">
        <li>
          <NavLink activeClassName="activeSection" to="/user/dashboard">
            <AiOutlineDashboard size={18} />
            <span> dashboard </span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeSection" to="/user/post">
            <RiSendPlaneLine size={18} />
            <span> post an ad </span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeSection" to="/user/ads">
            <BsLayers size={18} />
            <span> my ads </span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeSection" to="/user/favorite">
            <AiOutlineHeart size={18} />
            <span> my favorites </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavBar;
