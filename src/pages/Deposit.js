import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import LodaingSpinner from "../components/LodaingSpinner";
import { financialFloat } from "../functions.js/functions";
import { getDeposit } from "../network/userNet";
import { setCrypto } from "../redux/actions/userActions";

const Deposit = () => {
  const [transfer, setTransfer] = useState([]);
  const setting = useSelector((state) => state.userReducer.setting);
  const user = useSelector((state) => state.userReducer.user);
  const [spinner, setSpinner] = useState(true);
  const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSpinner(false);

    getDeposit().then(function (response) {
      console.log(response.data);
      setCompanies(() => {
        return response.data;
      });
      dispatch(setCrypto(response.data));
    });
  }, []);
  return (
    <>
      <div className="content">
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <> 
              {companies
                ? companies.map((item, index) => (
                    <Card key={index} className="card_shadow">
                    
                      <NavLink to={"/deposit/" + index}>
                        <Card.Img variant="top" src={item.image} />
                      </NavLink>
                    </Card>
                  ))
                : ""} 
          </>
        )}
      </div>
    </>
  );
};

export default Deposit;
