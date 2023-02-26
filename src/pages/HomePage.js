import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {homepage} from "../network/pagesNet";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {useDispatch, useSelector} from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import {
  setNewBouquets,
  setNewCards,
  setNewCountNoty,
  setNewNews,
  setNewNoty,
  setNewSales,
  setNewUser,
  setSettings,
} from "../redux/actions/userActions";
import LodaingSpinner from "../components/LodaingSpinner";
import Marquee from "react-fast-marquee";
import {Card} from "react-bootstrap";

function HomePage() {
  const dispatch = useDispatch();

  const [ads, setAds] = useState([]);
  const [cards, setCards] = useState([]);
  const [countNoty, setCountNoty] = useState(0);
  const [news, setNews] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const [noty, setNoty] = useState([]);
  const [sales, setSales] = useState([]);
  const [settting, setSettting] = useState([]);

  useEffect(() => {
    homepage()
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          setAds(() => {
            return response.data.data.Ads;
          });

          setCards(() => {
            return response.data.data.cards;
          });
          setCountNoty(() => {
            return response.data.data.countNoty;
          });
          setNews(() => {
            return response.data.data.news;
          });
          setNoty(() => {
            return response.data.data.noty;
          });
          setSales(() => {
            return response.data.data.sales;
          });
          setSettting(() => {
            return response.data.data.settings;
          });

          setSpinner(false);
          dispatch(setNewBouquets(response.data.data.bouquets));
          dispatch(setNewCards(response.data.data.cards));
          dispatch(setNewSales(response.data.data.sales));
          dispatch(setNewNews(response.data.data.news));
          dispatch(setSettings(response.data.data.settings));
          dispatch(setNewUser(response.data.data.user));
          dispatch(setNewNoty(response.data.data.noty));
          dispatch(setNewCountNoty(response.data.data.countNoty));
        }
      })
      .catch(function (err) {
        console.log(err);
        setSpinner(false);
      });
  }, []);
  return (
    <>
      <div style={{marginBottom: "100px"}}>
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <>
            <Marquee
              speed="10"
              style={{
                background: "#7d5fff",
                color: "#fff",
                "--gradient-color": "inherit !important",
              }}
              direction="right"
            >
              {news ? news.map(new1 => new1.text + " | ") : ""}
            </Marquee>
            <AwesomeSlider>
              {ads.map((item, index) => (
                <div key={index} data-src={item.url} />
              ))}
            </AwesomeSlider>
            <div className="cards_container">
              {cards.map((item, index) => (
                <Card key={index} className="card_shadow">
                  <NavLink to={"/bouquets/" + item.id}>
                    <span
                      className={
                        item.status === "1" ? "available yes" : "available no"
                      }
                    ></span>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body
                      style={{
                        textAlign: "center",
                        fontSize: "large",
                        fontWeight: "bold",
                      }}
                    >
                      <Card.Title
                        to={"/bouquets/" + item.id}
                        style={{textAlign: "center"}}
                      >
                        {item.name}
                      </Card.Title>
                    </Card.Body>
                  </NavLink>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
