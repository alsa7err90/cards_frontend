import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {
  setChangeTheme,
  setFilter,
  setFilterBouquets,
} from "../redux/actions/userActions";
import {BsMoonStarsFill, BsFillSunFill, BsBell} from "react-icons/bs";

function SidePopular() {
  const dispatch = useDispatch();
  const sales = useSelector(state => state.userReducer.sales);
  const cards = useSelector(state => state.userReducer.cards);
  const bouquets = useSelector(state => state.userReducer.bouquets);
  const theme = useSelector(state => state.userReducer.theme);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const changeTheme = theme => {
    dispatch(setChangeTheme(theme));
  };
  useEffect(() => {
    //changing color of body with darkmode in useEffect
    document.body.style.backgroundColor =
      theme === "dark-theme" ? "#292c35" : "#fff";
  }, []);
  useEffect(() => {
    //changing color of body with darkmode in useEffect
    document.body.style.backgroundColor =
      theme === "dark-theme" ? "#292c35" : "#fff";
  }, [theme]);
  const handleSearch = event => {
    let value = event.target.value.toLowerCase();
    setSearch(value);
    if (value == "") {
      dispatch(setFilter(null));
      dispatch(setFilterBouquets(null));
    } else {
      let result = [];
      let result2 = [];
      console.log(value);
      result = cards.filter(el => {
        if (value === "") {
          return el;
        } else {
          return el.name.toLowerCase().includes(value);
        }
      });

      //  return Object.values(item).join('').toLowerCase().includes(value)
      dispatch(setFilter(result));

      result2 = bouquets.filter(el => {
        if (value === "") {
          return dispatch(setFilterBouquets(result2));
        } else {
          return el.name.toLowerCase().includes(value);
        }
      });
      dispatch(setFilterBouquets(result2));
    }
  };

  return (
    <>
      <div className="page-end">
        <div className="control-page-end">
          {theme === "" ? (
            <div
              className="control-theme"
              onClick={() => {
                changeTheme("dark-theme");
              }}
            >
              <BsMoonStarsFill color="black" />
            </div>
          ) : (
            <div
              className="control-theme"
              onClick={() => {
                changeTheme("");
              }}
            >
              <BsFillSunFill color="yellow" />
            </div>
          )}

          <div className="include-language">
            <li>
              <NavLink
                to={"/noty"}
                variant="text-primary"
                style={{color: "var(--colorText)"}}
              >
                <BsBell />
              </NavLink>
            </li>
          </div>
        </div>
        <div className="content-page-end">
          <div className="header-end">
            <div className="box-form-search">
              <div className="input-group-search">
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={event => handleSearch(event)}
                  placeholder="بحث"
                  className="form-control input_search"
                  required
                />
              </div>
            </div>
          </div>

          <div className="box-page-end">
            <h4 className="title">المنتجات الاكثر مبيعاُ</h4>
            <div className="list-items-page-end">
              {sales
                ? sales.map((item, index) => (
                    <a key={index} href={"/view_item/" + item.id}>
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={item.image}
                          alt="Soul Chill"
                        />
                        <div className="card-body">
                          <h6 className="card-title">{item.name}</h6>
                        </div>
                      </div>
                    </a>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="list-items-page-end">
        {filteredResults
          ? filteredResults.map((item, index) => (
              <div key={index} className="items__card__5">
                <div className="card card__items">
                  <div className="content-card-img">
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt="Edit Here"
                    />
                  </div>

                  <div className="card-body">
                    <NavLink to={"/bouquets/" + item.id}>
                      <h6 className="card-title">{item.name}</h6>
                    </NavLink>
                    <p className="card-text">يتم الشحن عبر الايدي بشكل سريع</p>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>{" "}
    </>
  );
}

export default SidePopular;
