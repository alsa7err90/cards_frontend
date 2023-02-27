import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {useEndDate} from "../hooks/useEndDate";
import {useStartDate} from "../hooks/useStartDate";
import {getOrders} from "../network/userNet";
import Form from "react-validation/build/form";
import {useDispatch} from "react-redux";
import {searchOrders} from "../network/cardsNet";
import InputComponent from "../components/InputComponent";
import LodaingSpinner from "../components/LodaingSpinner";
import Table from "react-bootstrap/Table";
import {motion} from "framer-motion";

const OrdersPage = () => {
  const [countAllOrders, setCountAllOrders] = useState(0);
  const [countComplateOrders, setCountComplateOrders] = useState(0);
  const [countPendingOrders, setCountPendingOrders] = useState(0);
  const [countRejectedOrders, setCountRejectedOrders] = useState(0);
  const {startDate, changeStartDate} = useStartDate();
  const [player_id, setPlayer_id] = useState("");
  const [spinner, setSpinner] = useState(true);

  const {endDate, changeEndDate} = useEndDate();
  const [orders, setHOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useRef();
  useEffect(() => {
    getOrders().then(function (response) {
      console.log(response.data);

      setCountAllOrders(() => {
        return response.data.count_all_orders;
      });
      setCountComplateOrders(() => {
        return response.data.count_complate_orders;
      });
      setCountPendingOrders(() => {
        return response.data.count_pending_orders;
      });

      setCountRejectedOrders(() => {
        return response.data.count_rejected_orders;
      });
      setHOrders(() => {
        return response.data.orders;
      });
      setSpinner(false);
    });
  }, []);
  const handlePayout = e => {
    e.preventDefault();
    setLoading(true);

    const data = {
      player_id: player_id,
      from: startDate,
      to: endDate,
    };
    searchOrders(data).then(
      response => {
        console.log(response.data);
        setHOrders(() => {
          return response.data;
        });
        setLoading(false);
        // setTableSearch(true);
      },
      error => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setLoading(false);
      }
    );
  };
  function formatTime(time, prefix = "") {
    return typeof time == "object" ? prefix + time.toLocaleDateString() : "";
  }
  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.7}}
        className="flex flex-col items-center gap-40 w-full relative mt-48"
        style={{marginBottom: "100px"}}
      >
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <>
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.7}}
              className="container3"
            >
              <div className="row">
                <div class="four col-md-3 col-6 pt-1">
                  <div class="counter-box colored">
                    <span class="counter">{countAllOrders}</span>
                    <p>كل الطلبات</p>
                  </div>
                </div>
                <div class="four col-md-3 col-6 pt-1">
                  <div class="counter-box">
                    <span class="counter">{countPendingOrders}</span>
                    <p>قيد الانتظار</p>
                  </div>
                </div>

                <div class="four col-md-3 col-6 pt-1">
                  <div class="counter-box">
                    <span class="counter">{countComplateOrders}</span>
                    <p>مكتمل</p>
                  </div>
                </div>
                <div class="four col-md-3 col-6 pt-1">
                  <div class="counter-box">
                    <span class="counter">{countRejectedOrders}</span>
                    <p>غير مكتمل</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.7}}
              className="form_search"
            >
              <Form
                onSubmit={handlePayout}
                ref={form}
                className="form-data-page"
                id="myform"
              >
                <div className="card-date-start">
                  <div className="form-group">
                    <InputComponent
                      label="معرف الحساب"
                      id="date_start"
                      className="form-control"
                      type="text"
                      name="date_start"
                      value={player_id}
                      onChange={e => setPlayer_id(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>
                <div className="card-date-start">
                  <div className="form-group">
                    <InputComponent
                      label="تاريخ البدء"
                      id="date_start"
                      className="form-control"
                      type="date"
                      name="date_start"
                      value={startDate}
                      onChange={changeStartDate}
                      placeholder="Start Date Date"
                    />
                  </div>
                </div>
                <div className="card-date-end">
                  <div className="form-group">
                    <InputComponent
                      label="تاريخ الانتهاء"
                      className="form-control"
                      type="date"
                      name="end_date"
                      value={endDate}
                      onChange={changeEndDate}
                      placeholder="End Date"
                    />
                  </div>
                </div>

                <div className="card-submit">
                  <button className="btn_view" disabled={loading}>
                    {loading === true ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      ""
                    )}
                    <span>عرض</span>
                  </button>
                </div>
              </Form>
            </motion.div>

            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.7}}
              className="content-table-data"
            >
              <Table responsive>
                <thead>
                  <tr>
                    <th className="th1">#</th>
                    <th className="th2">البيان</th>
                    <th className="th1">النقاط</th>
                    <th className="th1">المبلغ</th>

                    <th className="th1">الحالة</th>
                    <th className="th2">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    ? orders.map((item, index) => (
                        <tr key={index}>
                          <td scope="row">{item.id}</td>
                          <td>{item.name_card}</td>
                          <td>{item.points}</td>
                          <td>{item.price}</td>
                          <td>{item.state}</td>
                          <td>
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </Table>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default OrdersPage;
