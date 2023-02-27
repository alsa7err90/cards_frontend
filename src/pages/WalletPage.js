import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {financialFloat} from "../functions.js/functions";
import {getWallet} from "../network/userNet";
import LodaingSpinner from "../components/LodaingSpinner";
import Table from "react-bootstrap/Table";
import {motion} from "framer-motion";
const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [balanceIn, setBalanceIn] = useState(0);
  const [balanceOut, setBalanceOut] = useState(0);
  const [historyBalance, setHistoryBalance] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getWallet().then(function (response) {
      console.log(response.data);

      setBalance(() => {
        return response.data.balance;
      });
      setBalanceIn(() => {
        return response.data.balance_in;
      });
      setBalanceOut(() => {
        return response.data.balance_out;
      });

      setHistoryBalance(() => {
        return response.data.HistoryBalance.data;
      });
      setSpinner(false);
    });
  }, []);

  return (
    <>
      <div className="">
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.7}}
          >
            <div className="container3">
              <div className="row">
                <div class="four col-4">
                  <div class="counter-box colored">
                    <span class="counter"> {financialFloat(balance)}</span>
                    <p>الرصيد</p>
                  </div>
                </div>
                <div class="four col-4">
                  <div class="counter-box">
                    <span class="counter">{financialFloat(balanceIn)}</span>
                    <p>وارد</p>
                  </div>
                </div>

                <div class="four col-4">
                  <div class="counter-box">
                    <span class="counter">{financialFloat(balanceOut)}</span>
                    <p>صادر</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form_search">
              <form
                className="form-data-page"
                id="myform"
                action=""
                method="POST"
                enctype="multipart/form-data"
              >
                <div className="card-date-start">
                  <div className="form-group">
                    <label
                      for="date_start"
                      style={{
                        textAlign: "end",
                        width: "100%",
                        margin: "10px 0",
                      }}
                    >
                      تاريخ البدء
                    </label>
                    <input
                      id="date_start"
                      type="date"
                      className="form-control"
                      name="date_start"
                      value="2023-01-02"
                    />
                  </div>
                </div>
                <div className="card-date-end">
                  <div className="form-group">
                    <label
                      for="date_end"
                      style={{
                        textAlign: "end",
                        width: "100%",
                        margin: "10px 0",
                      }}
                    >
                      تاريخ الانتهاء
                    </label>
                    <input
                      id="date_end"
                      type="date"
                      className="form-control"
                      name="date_end"
                      value="2023-01-02"
                    />
                  </div>
                </div>

                <button type="submit" className="btn_view">
                  عرض
                </button>
              </form>
            </div>

            <div className="content-table-data">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="th1">#</th>
                    <th className="th2">البيان</th>
                    <th className="th1">المبلغ</th>
                    <th className="th1">النوع</th>

                    <th className="th1">الحالة</th>
                    <th className="th2">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {historyBalance.map((item, index) => (
                    <tr key={index}>
                      <td scope="row">{item.id}</td>
                      <td>{item.msg_action}</td>
                      <td>{item.amount}</td>
                      <td>{item.action}</td>
                      <td> </td>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default WalletPage;
