import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { getBouquets } from "../network/cardsNet";
import { addToFavorite } from "../network/userNet";
import LodaingSpinner from "../components/LodaingSpinner";

const ViewItem = () => {
  let { id } = useParams();
  const [card, setCard] = useState({});
  const [image, setImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(0);
  const [nameCard, setNameCard] = useState("");
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getBouquets(id)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data);
          setCard(() => {
            return response.data.data.bouquet;
          });
          setImage(() => {
            return response.data.data.image;
          });
          setIsFavorite(() => {
            return response.data.data.favorite;
          });
          setNameCard(() => {
            return response.data.data.name_card;
          });
        }
        setSpinner(false);
      })
      .catch(function (err) {
        console.log(err);
        setSpinner(false);
      });
  }, []);

  function add_to_favorite(id) {
    addToFavorite(id)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return (
    <>
    
    <div className="content">
      {spinner ? (
        <LodaingSpinner />
      ) : (
        <>
          {" "}
          <div className="content-pages view_item">
            <div className="breadcrumb-bar">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to={"bouquets/" + card.card_id}>{nameCard}</NavLink>
                </li>
                <li className="breadcrumb-item">{card.name}</li>
              </ol>
            </div>

            <div className="content-view-item">
              <div className="groub-img-details">
                <div className="img-view-item">
                  <img className="image-item" src={image} />
                </div>

                <div className="details-view-item">
                  <h5> {card.name} </h5>
                  <div className="content-details">
                    <span>تفاصيل موسعة</span>
                    <p style={{ whiteSpace: "pre-line" }}> {card.note} </p>
                  </div>
                  <div className="status-items">
                    <span>الحالة : </span>
                    <span>متوفر </span>
                  </div>
                </div>
              </div>

              <div className="groub-btn-view-item">
                <div className="group-price">
                  <span>السعر</span>
                  <span className="price">{card.price} $</span>
                </div>

                {isFavorite == 0 ? (
                  <button type="button">
                    <span
                      data-product_id="774"
                      className="c-favorite add-item-toFavorite"
                      onClick={() => add_to_favorite(id)}
                    >
                      إضافة الى المفضلة
                    </span>
                  </button>
                ) : (
                  <>it's favorite</>
                )}

                {card.is_buy_by_player_id == 1 ? (
                  <NavLink
                    className="btn btn-primary p-2 btn-sm price-card purchase_direct bg-gradient-dark"
                    to={"/buy_item_player_id/" + card.id}
                  >
                    {" "}
                    <span style={{ paddingTop: "20px" }}>شراء </span>
                    {card.price} $
                  </NavLink>
                ) : (
                  <NavLink
                    className="btn btn-primary p-2 btn-sm price-card purchase_direct bg-gradient-dark"
                    to={"/buy_item/" + card.id}
                  >
                    <span>شراء </span>
                    {card.price} $
                  </NavLink>
                )}
              </div>
            </div>
          </div>{" "}
        </>
      )}
      </div>
    </>
  );
};
export default ViewItem;
