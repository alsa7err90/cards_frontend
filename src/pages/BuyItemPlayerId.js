import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Lodaing from "../components/Lodaing";
import { financialFloat } from "../functions.js/functions";
import { buyItem, getBouquets } from "../network/cardsNet";
import { setNewUser } from "../redux/actions/userActions";
import LodaingSpinner from "../components/LodaingSpinner";

const BuyItemPlayerId = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [idPlayer, setIdPlayer] = useState("");
  const [count, setCount] = useState(1);
  const [nameAccount, setNameAccount] = useState("");
  const [card, setCard] = useState({});
  const [newPoints, setNewPoints] = useState({});
  const [nameCard, setNameCard] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const [responseCode, setResponseCode] = useState("");
  const [response, setResponse] = useState();
  const [stateResponse, setstateResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    console.log("user", user);
    getBouquets(id)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data);
          setCard(() => {
            return response.data.data.bouquet;
          });
          setNewPoints(() => {
            return response.data.data.bouquet.points;
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
    setLoading(true);
    setSpinner(true);
    if (count >= 1) {
    } else {
      count = 1;
    }
    const data = {
      player_id: idPlayer,
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
        setLoading(false);
        setSpinner(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setSpinner(false);
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
                <div className="order-row">
                  {stateResponse >= 0 ? (
                    <div className="alert-success">
                      {response ? "message : " + response : ""}
                      {responseCode ? "code : " + responseCode : ""}
                      {stateResponse ? "state : " + stateResponse : ""}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="item-input">
                    <ion-icon
                      className="label"
                      name="diamond-outline"
                    ></ion-icon>
                    <input
                      className="text-count-item"
                      type="number"
                      id="quantity"
                      name="num"
                      min="1"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      // disabled={card.type ==="amount" ?false: true}
                      required
                    />
                  </div>
                </div>
                <div className="order-row">
                  <div className="item-input">
                    <i className="icon-globe-1 label"></i>
                    <input
                      type="text"
                      name="idPlayer"
                      value={idPlayer}
                      onChange={(e) => setIdPlayer(e.target.value)}
                      placeholder="معرف الحساب"
                      required
                    />
                  </div>
                </div>
                <div className="order-row count">
                  {/* <div className="control-count">
                <span className="iconAdd" onClick={() => setCount(count + 1)}>
                  +
                </span>
                <input
                  className="text-count-item"
                  type="text"
                  name="num" 
                  value={count}
                  required
                  readonly
                />
                <span
                  className="iconAdd"
                  onClick={() => (count > 1 ? setCount(count - 1) : "")}
                >
                  - 
                </span>
              </div> */}
                  <div>
                    <span className="total-item">
                      {financialFloat(count * card.price)}
                    </span>
                    <span className="codeCurrency">$</span>
                  </div>
                </div>
              </div>
              {loading ? (
                <Lodaing width="100" />
              ) : (
                <button
                  className="btn-purchase"
                  onClick={buyNow}
                  type="submit"
                  name="submit"
                >
                  شراء
                </button>
              )}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default BuyItemPlayerId;
