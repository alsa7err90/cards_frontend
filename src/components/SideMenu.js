import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, redirect, useNavigate} from "react-router-dom";
import {setLogout, toggleMenu} from "../redux/actions/userActions";
import {
  AiOutlineFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import {useRef} from "react";
import {useEffect} from "react";
import {financialFloat} from "../functions.js/functions";

function SideMenu() {
  const logged = useSelector(state => state.userReducer.logged);
  const token = useSelector(state => state.userReducer.token);
  const toggleMenuOld = useSelector(state => state.userReducer.toggleMenu);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const expand = "lg";
  const sizeIcons = "30";
  const logoutNow = () => {
    console.log("logout");
    dispatch(setLogout());

    return navigate("/login");
  };
  const closeMenu = () => {
    dispatch(toggleMenu(!toggleMenuOld));
  };

  return (
    <>
      <div className={toggleMenuOld ? "sidebar active" : "sidebar"}>
        <div className="profile shadow-sm">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              margin: "5px 0",
              backgroundColor: "#EB455F",
              color: "white",
              padding: "4px",
            }}
          >
            {financialFloat(user.balance)} $ :رصيدي
          </p>
          <div className="div_icons">
            <NavLink
              onClick={closeMenu}
              className={favorite =>
                favorite.isActive ? " nav-link active" : "nav-link"
              }
              to="/favorite"
            >
              <span className="icon">
                <i class="far fa-heart"></i>
              </span>
            </NavLink>
            <NavLink
              onClick={closeMenu}
              className={Profile =>
                Profile.isActive ? " nav-link  active" : " nav-link "
              }
              to="/Profile"
            >
              <span className="icon">
                <i class="far fa-user"></i>
              </span>
            </NavLink>

            <span className="btn_span" onClick={logoutNow}>
              خروج
            </span>
          </div>
        </div>
        <ul className="shadow-sm">
          <li>
            <NavLink
              onClick={closeMenu}
              className={home => (home.isActive ? "active" : "")}
              end
              to="/"
            >
              <span className="icon">
                <i className="fas fa-home"></i>
              </span>
              <span className="item">الصفحة الرئيسية</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={closeMenu}
              className={wallet =>
                wallet.isActive ? " nav-link active" : "nav-link"
              }
              to="/wallet"
            >
              <span className="icon">
                <i className="fas fa-wallet"></i>
              </span>
              <span className="item"> المحفظة</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={orders =>
                orders.isActive ? " nav-link active" : "nav-link"
              }
              to="/orders"
            >
              <span className="icon">
                <i className="fas fa-shopping-cart"></i>
              </span>
              <span className="item">الطلبات</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={closeMenu}
              className={Profile =>
                Profile.isActive ? " nav-link active" : "nav-link"
              }
              to="/deposit"
            >
              <span className="icon">
                <i class="far fa-money-bill-alt"></i>
              </span>
              <span className="item">طرق الدفع والايداع </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={closeMenu}
              className={agent =>
                agent.isActive ? " nav-link active" : "nav-link"
              }
              to="/agent"
            >
              <span className="icon">
                <i class="far fa-money-bill-alt"></i>
              </span>
              <span className="item">الوكلاء</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={closeMenu}
              className={tickets =>
                tickets.isActive ? " nav-link active" : "nav-link"
              }
              to="/tickets"
            >
              <span className="icon">
                <i class="far fa-money-bill-alt"></i>
              </span>
              <span className="item">الدعم</span>
            </NavLink>
          </li>
        </ul>
        <ul className="div_icons">
          <AiOutlineFacebook size={25} style={{cursor: "pointer"}} />
          <AiOutlineTwitter size={25} style={{cursor: "pointer"}} />
          <AiOutlineYoutube size={25} style={{cursor: "pointer"}} />
        </ul>
      </div>
    </>
  );
}

export default SideMenu;
