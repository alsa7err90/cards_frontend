import React, {useState} from "react";
import "./App.css";

import {
  Routes,
  Route,
  useLocation,
  redirect,
  useNavigate,
  NavLink,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import GetewayPage from "./pages/GetewayPage";
import ProfilePage from "./pages/ProfilePage";
import BouquetsPage from "./pages/BouquetsPage";
import AmountPage from "./pages/AmountPage";
import ViewItem from "./pages/ViewItem";
import WalletPage from "./pages/WalletPage";
import OrdersPage from "./pages/OrdersPage";
import FavoritePage from "./pages/FavoritePage";
import BuyItemPlayerId from "./pages/BuyItemPlayerId";
import BuyItem from "./pages/BuyItem";
import Deposit from "./pages/Deposit";
import DepositSub from "./pages/DepositSub";
import {useDispatch, useSelector} from "react-redux";
import Noty from "./pages/Noty";
import {BsBell} from "react-icons/bs";
import {
  setFilter,
  setFilterBouquets,
  setLogout,
  toggleMenu,
} from "./redux/actions/userActions";
import SideMenu from "./components/SideMenu";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchPage from "./pages/SearchPage";
import {useEffect} from "react";
import Agent from "./pages/Agent";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";

function App() {
  const allNews = useSelector(state => state.userReducer.news);
  const theme = useSelector(state => state.userReducer.theme);
  const logged = useSelector(state => state.userReducer.logged);
  const toggleMenuOld = useSelector(state => state.userReducer.toggleMenu);

  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      console.log("logged 3", logged);
      if (location.pathname !== "/login") {
        return navigate("/login");
      }
    }
  }, []);
  console.log("logged", logged);

  const logoutNow = () => {
    console.log("logout");
    dispatch(setLogout());
  };

  const toggleMenuNow = () => {
    console.log("toggleMenu");
    dispatch(toggleMenu(!toggleMenuOld));
  };
  return (
    <>
      {location.pathname == "/login" ? (
        <Routes>
          <Route path="login" exact element={<LoginPage />} />
        </Routes>
      ) : (
        <section className="home">
          <div className="wrapper">
            <div className={toggleMenuOld ? "section active" : "section"}>
              <Header />
              <div
                onClick={toggleMenuNow}
                className={!toggleMenuOld ? "layerOver active" : "layerOver"}
              ></div>

              <div className="app_container">
                <Routes>
                  <Route path="/" exact element={<HomePage />} />

                  <Route path="bouquets/:id" exact element={<BouquetsPage />} />
                  <Route path="amount/:id" exact element={<AmountPage />} />
                  <Route path="Geteway/:id" exact element={<GetewayPage />} />
                  <Route path="Profile" exact element={<ProfilePage />} />
                  <Route path="wallet" exact element={<WalletPage />} />
                  <Route path="orders" exact element={<OrdersPage />} />
                  <Route path="search" exact element={<SearchPage />} />
                  <Route path="view_item/:id" exact element={<ViewItem />} />
                  <Route path="deposit" exact element={<Deposit />} />
                  <Route path="deposit/:id" exact element={<DepositSub />} />

                  <Route path="favorite" exact element={<FavoritePage />} />
                  <Route path="buy_item/:id" exact element={<BuyItem />} />
                  <Route path="noty" exact element={<Noty />} />
                  <Route path="agent" exact element={<Agent />} />
                  <Route path="tickets" exact element={<Tickets />} />
                  <Route path="/ticket/:id" exact element={<Ticket />} />
                  <Route
                    path="buy_item_player_id/:id"
                    exact
                    element={<BuyItemPlayerId />}
                  />
                </Routes>
                {location.pathname == "/login" ? "" : <SideMenu />}
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="menu">
        <div className="tab-nav-container">
          <div
            className={
              location.pathname == "/Wallet"
                ? "tab active_tab pink"
                : "tab pink"
            }
          >
            <NavLink to={"/Wallet"}>
              {" "}
              <p>
                <i className="fas fa-wallet"></i>
              </p>
            </NavLink>
          </div>
          <div
            className={
              location.pathname == "/search"
                ? "tab active_tab yellow"
                : "tab yellow"
            }
          >
            <NavLink to={"/search"}>
              {" "}
              <p>
                <i className="fas fa-search"></i>
              </p>
            </NavLink>
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              border: "1px solid #fff",
              position: "relative",
              top: "-10px",
            }}
            className={
              location.pathname == "/" ? "tab active_tab purple" : "tab purple"
            }
          >
            <NavLink to={"/"}>
              {" "}
              <p>
                <i className="fas fa-home"></i>
              </p>
            </NavLink>
          </div>

          <div
            className={
              location.pathname == "/orders"
                ? "tab active_tab teal"
                : "tab teal"
            }
          >
            <NavLink to={"/orders"}>
              <p>
                <i className="fas fa-shopping-cart"></i>
              </p>
            </NavLink>
          </div>
          <div
            className={
              location.pathname == "/noty" ? "tab active_tab teal" : "tab teal"
            }
          >
            <NavLink to={"/noty"}>
              <p>
                {" "}
                <i className="far fa-bell"></i>
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
