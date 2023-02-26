import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFvorite } from "../network/userNet";
import LodaingSpinner from "../components/LodaingSpinner";
import { Card } from "react-bootstrap";
import { Button } from "bootstrap";

const FavoritePage = () => {
  const [list, setList] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getFvorite().then(function (response) {
      console.log(response.data);

      setList(() => {
        return response.data.bouquet;
      });
      setSpinner(false);
    });
  }, []);

  return (
    <>
      
      <div className="content">
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <>
            {list.map((item, index) => (
              <Card
                style={{ width: "18rem" }}
                key={index}
                className="card_shadow"
              >
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
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default FavoritePage;
