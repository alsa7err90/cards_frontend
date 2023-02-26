import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LodaingSpinner from "../components/LodaingSpinner";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { depositNow } from "../network/cardsNet";
const DepositSub = () => {
  let { id } = useParams();
  const crypto = useSelector((state) => state.userReducer.crypto);
  const setting = useSelector((state) => state.userReducer.setting);
  const [companies, setCompanies] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("d3");
  const [amount, setAmount] = useState();
  const [companyTrans, setCompanyTrans] = useState("");
  const [numberNoty, setNumberNoty] = useState("");
  const [notes, setNotes] = useState("");
  useEffect(() => {
    console.log( crypto[id]);

    setCompanies(() => {
      return crypto[id];
    });
    
    

    setSpinner(false);
  }, []);

  const payNow = () => {
    
    const data = {
      data_sender: sender,
      amount: amount,
      receiver:receiver,
      amount_with_fee : amount - (amount * companies["text_fee"]) / 100,
      company_trans: companyTrans,
      number_bill: numberNoty,
      notes: notes,
      method :companies["name"],  

    };
    depositNow(data)
      .then(function (response) {
        console.log(response.data);
        alert("done")
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
    <>
      <div className="content">
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <>
            <div className="content-pages"> 
                  <h3 className="title-content">طريقة الدفع {  companies['name'] }</h3>
                  <div className="content-methods">
                    {companies["text_fee"] ? (
                      <p className="row-commission">
                        <span>
                          {" "}
                          {companies["text_fee"]
                            ? companies["text_fee"]
                            : ""}{" "}
                        </span>
                      </p>
                    ) : (
                      <></>
                    )}

                    <p className="row-commission">
                      {companies["instructions"]}
                    </p>

                    <p className="row-commission">
                      <span>
                        {companies['email'] ? "email : " + companies['email'] : ""}
                        <br />
                        {companies["email1"]
                          ? "or email : " + companies["email1"]
                          : ""}
                        <br />
                        {companies["name_reciver"]
                          ? "اسم المستلم  : " + companies["name_reciver"]
                          : ""}
                        <br />
                        {companies["phone"]
                          ? "phone : " + companies["phone"]
                          : ""}
                        <br />
                        {companies["city"] ? "city : " + companies["city"] : ""}
                        <br />
                        <i
                          data-textcopy="P1055146652"
                          className="icon-link-ext btn-copy-text"
                        ></i>
                      </span>
                      و من ثم التبليغ عن الدفعة هنا
                    </p>

                    <div className="content-alert"></div>

                    <div className="form-transfer">
                       
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>اسم المرسل</Form.Label>
                          <Form.Control
                            type="text"
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            placeholder="اسم المرسل"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>المبلغ</Form.Label>
                          <Form.Control
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="المبلغ"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>قيمة المبلغ الذي يجب تحوليه مع أجور التحويل</Form.Label>
                          <Form.Control
                            type="text"
                            value={
                              amount > 0
                                ? amount - (amount * companies["text_fee"]) / 100
                                : ""
                            }
                            placeholder="المبلغ"
                          />
                        </Form.Group>

                        {companies["type"] === "transfer" ? (
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>مكتب التحويل</Form.Label>
                            <Form.Control
                              type="text"
                              value={companyTrans}
                              onChange={(e) => setCompanyTrans(e.target.value)}
                              placeholder="مكتب التحويل"
                            />
                          </Form.Group>
                        ) : (
                          ""
                        )}

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>رقم الاشعار او رقم الحوالة</Form.Label>
                          <Form.Control
                            type="text"
                            value={numberNoty}
                            onChange={(e) => setNumberNoty(e.target.value)}
                            placeholder="012345"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>ملاحظة</Form.Label>
                          <Form.Control
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="اي شيء"
                          />
                        </Form.Group>

                        <Button onClick={payNow} variant="primary" type="submit">
                          Submit
                        </Button>
                       
                    </div>
                  </div>
                </div> 
          </>
        )}
      </div>
    </>
  );
};

export default DepositSub;
