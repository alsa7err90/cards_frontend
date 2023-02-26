import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { financialFloat } from "../functions.js/functions";
import { buyItem, getBouquets } from "../network/cardsNet";
import LodaingSpinner from "../components/LodaingSpinner";

const BuyItem = () => {
  let { id } = useParams();
  const [idPlayer, setIdPlayer] = useState("");
  const [count, setCount] = useState(1);
  const [nameAccount, setNameAccount] = useState("");
  const [card, setCard] = useState({});
  const [nameCard, setNameCard] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const [responseCode, setResponseCode] = useState("");
  const [response, setResponse] = useState();
  const [stateResponse, setstateResponse] = useState();
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

  const buyNow = () => {
    if (count < 1) {
      count = 1;
    }
    const data = { 
      name_account: nameAccount,
      count: count,
      product_id: id,
    };
    buyItem(data)
      .then(function (response) {
        console.log(response.data);
        setResponse(() => {
          return response.data.msg;
        });
        setResponseCode(() => {
          return response.data.code;
        });
        setstateResponse(() => {
          return response.data.state;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {spinner ? (
        <LodaingSpinner />
      ) : (
        <>
          <div className="content-pages new-order-item">
            <div className="breadcrumb-bar">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to={"bouquets/" + card.card_id}>{nameCard}</NavLink>
                </li>
                <li className="breadcrumb-item">{card.name}</li>
                <li className="breadcrumb-item">شراء</li>
              </ol>
            </div>

            <div className="mybalance bg-c-blue">
              <h5>الرصيد</h5>
              <span className="amount-balance">
                {" "}
                {financialFloat(user.balance)}$
              </span>
            </div>

            <div className="content-order-item">
              <h5>{card.name}</h5>
              <span>
                <span className="price-item">{financialFloat(card.price)}</span>
                <span className="codeCurrency">$</span>
              </span>
              <div className="content-order">
                {stateResponse >= 0 ? (
                  <div className="alert-success">
                    {response ? "message : " + response : ""}
                    {responseCode ? "code : " + responseCode : ""}
                    {stateResponse ? "state : " + stateResponse : ""}
                  </div>
                ) : (
                  ""
                )}

                {card.type === "amount" ? (
                  <div className="order-row">
                    <div className="item-input">
                      <ion-icon
                        className="label"
                        name="diamond-outline"
                      ></ion-icon>
                      <input
                        className="text-count-item"
                        type="number"
                        id="price"
                        name="num"
                        min="1"
                        value={card.price}
                        // onChange={(e) => setCount(e.target.value)}
                        disabled
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="order-row">
                      <p className="confirm-purchase">قم بتأكيد الشراء</p>
                    </div>
                    <div className="order-row count">
                      <div className="control-count">
                        <span
                          className="iconAdd"
                          onClick={() =>
                            setCount((s) => {
                              return count + 1;
                            })
                          }
                        >
                          +
                        </span>
                        <input
                          className="text-count-item"
                          value={count}
                          type="text"
                          name="num"
                          required=""
                          readonly=""
                        />
                        <span
                          className="iconAdd"
                          onClick={() =>
                            count > 1
                              ? setCount((s) => {
                                  return count - 1;
                                })
                              : ""
                          }
                        >
                          -
                        </span>
                      </div>
                      <div>
                        <span className="total-item">
                          {financialFloat(count * card.price)}
                        </span>
                        <span className="codeCurrency">$</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                className="btn-purchase"
                onClick={buyNow}
                type="submit"
                name="submit"
              >
                شراء
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default BuyItem;
