import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineSearch,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import {IoMdNotificationsOutline} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {financialFloat} from "../functions.js/functions";
import {setLogout, toggleMenu} from "../redux/actions/userActions";

function Header() {
  const toggleMenuOld = useSelector(state => state.userReducer.toggleMenu);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutNow = () => {
    console.log("logout");
    dispatch(setLogout());

    return navigate("/login");
  };
  const toggleMenuNow = () => {
    console.log("toggleMenu");
    dispatch(toggleMenu(!toggleMenuOld));
  };
  return (
    <>
      <div className="top_navbar">
        <div className="sid_div_menu">
          <Link to={"/"}>
            <h2>
              OT<span id="logo_2">STOR</span>
            </h2>
          </Link>
        </div>

        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
          <NavLink to={"/search"}>
            <AiOutlineSearch color="black" size={25} />
          </NavLink>
          <NavLink to={"/noty"}>
            <IoMdNotificationsOutline color="black" size={25} />
          </NavLink>
          <div className="hamburger">
            <a
              href="#"
              id="hamburger_a"
              onClick={toggleMenuNow}
              className={!toggleMenuOld ? "hamburger_active" : ""}
            >
              <span className="span1"></span>
              <span className="span2"></span>
              <span className="span1"></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

/* 
<nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            color: "#fff",
          }}
        >
          <NavLink style={{color: "#fff"}} to={"/Wallet"}>
            Wallet
          </NavLink>

          <NavLink style={{color: "#fff"}} to={"/search"}>
            Search
          </NavLink>

          <NavLink style={{color: "#fff"}} to={"/"}>
            Home
          </NavLink>
          <NavLink style={{color: "#fff"}} to={"/"}>
            orders
          </NavLink>
          <NavLink style={{color: "#fff"}} to={"/"}>
            Notyfication
          </NavLink>
        </nav>
*/
/* 
<p>
          {financialFloat(user.balance)} ${" :رصيدي"}
        </p>
*/
