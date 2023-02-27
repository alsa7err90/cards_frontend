import React from "react";
import {useState} from "react";
import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {setFilter, setFilterBouquets} from "../redux/actions/userActions";
import {motion} from "framer-motion";

const SearchPage = () => {
  const filterBouquets = useSelector(state => state.userReducer.filterBouquets);
  const filterCards = useSelector(state => state.userReducer.filter);
  const [search, setSearch] = useState("");
  const cards = useSelector(state => state.userReducer.cards);
  const bouquets = useSelector(state => state.userReducer.bouquets);

  let navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

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
    <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 0.7}}
    >
      <div className="content">
        <input
          style={{}}
          type="text"
          name="search"
          className="form-control"
          value={search}
          onChange={event => handleSearch(event)}
          placeholder="بحث"
        />

        {filterBouquets
          ? filterBouquets.map((item, index) => (
              <Card key={index} className="card_shadow">
                <span
                  className={
                    item.status === "1" ? "available yes" : "available no"
                  }
                ></span>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <span className="newStyleBalance">{item.points} </span>

                    <span className="price-card float-bros-end">
                      {item.price} $
                    </span>
                  </Card.Text>

                  <NavLink
                    to={"/bouquets/" + item.company_id}
                    className="btn btn-primary"
                  >
                    {" "}
                    تفاصيل
                  </NavLink>
                </Card.Body>
              </Card>
            ))
          : ""}
        {filterCards
          ? filterCards.map((item, index) => (
              <Card key={index} className="card_shadow">
                <span
                  className={
                    item.status === "1" ? "available yes" : "available no"
                  }
                ></span>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>
                    <NavLink to={"/bouquets/" + item.id}>{item.name}</NavLink>
                  </Card.Title>
                </Card.Body>
              </Card>
            ))
          : ""}
      </div>
    </motion.div>
  );
};

export default SearchPage;
