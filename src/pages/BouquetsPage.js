import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {buyItem, getBouquets, getCard} from "../network/cardsNet";
import LodaingSpinner from "../components/LodaingSpinner";
import Modal from "react-bootstrap/Modal";
import {addToFavorite} from "../network/userNet";
import {financialFloat} from "../functions.js/functions";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import {motion} from "framer-motion";

const BouquetsPage = () => {
  let {id} = useParams();
  const [cards, setCards] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [responseCode, setResponseCode] = useState("");
  const [response, setResponse] = useState();
  const [stateResponse, setstateResponse] = useState();

  const [count, setCount] = useState(1);
  const [nameAccount, setNameAccount] = useState("");

  const [idPlayer, setIdPlayer] = useState("");

  const [isFavorite, setIsFavorite] = useState(0);
  // slected card

  const [card, setCard] = useState({});

  const [show, setShow] = useState(false);

  useEffect(() => {
    getCard(id)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data);
          setCards(() => {
            return response.data.data.bouquets;
          });
          setImage(() => {
            return response.data.data.image;
          });
        }

        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }, []);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function selectCard(id) {
    setShow(true);

    setCount(() => {
      return 1;
    });
    getBouquets(id)
      .then(function (response) {
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
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

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

  const buyNowId = () => {
    setLoading(true);
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
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 0.7}}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {loading ? (
          <LodaingSpinner />
        ) : (
          <React.Fragment>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{card.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="content-order">
                  {card.is_buy_by_player_id == 1 ? (
                    <React.Fragment>
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
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              value={count}
                              onChange={e => setCount(e.target.value)}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="order-row">
                        <div className="item-input">
                          <i className="icon-globe-1 label"></i>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>ID اللاعب</Form.Label>
                            <Form.Control
                              type="text"
                              value={idPlayer}
                              onChange={e => setIdPlayer(e.target.value)}
                              placeholder="معرف الحساب"
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                          backgroundColor: "#d8d4d4",
                          padding: "10px",
                          borderRadius: "4px",
                        }}
                      >
                        <div style={{display: "flex", gap: "10px"}}>
                          السعر:
                          <span>
                            <span className="price-item">
                              {financialFloat(card.price)}
                            </span>
                            <span className="codeCurrency">$</span>
                          </span>
                        </div>
                        <div style={{display: "flex", gap: "10px"}}>
                          المجموع :
                          <div>
                            <span className="total-item">
                              {financialFloat(count * card.price)}
                            </span>
                            <span className="codeCurrency">$</span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>price</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={card.price}
                          disabled
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={count}
                          onChange={e => setCount(e.target.value)}
                        />
                      </Form.Group>

                      <span className="total-item">
                        {financialFloat(count * card.price)}
                      </span>
                      <span className="codeCurrency">$</span>
                    </React.Fragment>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                {card.is_buy_by_player_id == 1 ? (
                  <Button
                    className="btn_view"
                    onClick={buyNowId}
                    type="submit"
                    name="submit"
                  >
                    شراء الان
                  </Button>
                ) : (
                  <Button
                    className="btn_view"
                    onClick={buyNow}
                    type="submit"
                    name="submit"
                  >
                    شراء الان
                  </Button>
                )}
              </Modal.Footer>
            </Modal>

            <section className="cards_bouquets_container">
              <h2
                style={{
                  textAlign: "center",
                  boxShadow: "0px 5px 25px #0000001a",
                  width: "100%",
                  padding: "10px",
                }}
              >
                {cards[0].name}
              </h2>
              {cards.map((item, index) => (
                <React.Fragment>
                  <span
                    className={
                      item.status === "1" ? "available yes" : "available no"
                    }
                  ></span>
                  <div key={index} className="card_shadow_bouquests">
                    <img variant="top" src={image} />
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <span className="newStyleBalance">{item.points} </span>

                      <span className="price-card float-bros-end">
                        {item.price} $
                      </span>
                    </Card.Text>
                    <div>
                      {item.is_buy_by_player_id == 1 ? (
                        <Button
                          variant="primary"
                          className="btn_view"
                          style={{
                            marginBottom: 0,
                            borderRadius: "3px",
                          }}
                          onClick={() => selectCard(item.id)}
                        >
                          <span style={{paddingTop: "20px"}}>شراء </span>
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="btn_view"
                          style={{
                            marginBottom: 0,
                            borderRadius: "3px",
                          }}
                          onClick={() => selectCard(item.id)}
                        >
                          <span>شراء </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </section>
          </React.Fragment>
        )}
      </div>{" "}
    </motion.div>
  );
};

export default BouquetsPage;
