import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useLoding} from "../hooks/Loding";
import {getMyTickets, newTicket} from "../network/cardsNet";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useMessage} from "../hooks/tickets/useMessage";
import {useTitle} from "../hooks/tickets/useTitle";

const Tickets = () => {
  const [content, setContent] = useState([]);
  const {loading, setLoading} = useLoding();
  const [show, setShow] = useState(false);
  const {title, changeTitle} = useTitle();
  const {message, changeMessage} = useMessage();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewTicket = () => {
    const data = {
      title: title,
      message: message,
    };
    newTicket(data)
      .then(function (response) {
        console.log(response.data);
        alert("done");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMyTickets()
      .then(function (response) {
        console.log(response.data.data);
        setContent(state => {
          return response.data.data;
        });
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="" style={{marginTop: "80px"}}>
      <div className="">
        {/* <Link
            to={"/NewTicket"}
            title="Create"
            className="btn btn-sm btn-primary"
          >
           
          </Link> */}
        <button className="btn_view" onClick={handleShow}>
          <i className="ti ti-plus"></i> New ticket
        </button>

        <div className="row  card pb-5">
          <div className="col-sm-12">
            <table className="table table-bordered tickets">
              <thead>
                <tr>
                  <td>title</td>
                  <td>status</td>
                  <td>action</td>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? "loadding"
                  : content.map((t, k) => (
                      <tr key={k}>
                        <td>{t.title}</td>

                        <td>{t.status}</td>
                        <td>
                          <span>
                            <div>
                              <Link
                                to={"/ticket/" + t.id}
                                className="btn_view"
                                data-bs-toggle="tooltip"
                                title="View"
                                style={{
                                  padding: "6px 20px",
                                  borderRadius: "3px",
                                }}
                              >
                                View
                              </Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            label="Title"
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={changeTitle}
            placeholder="title"
          />
          <br />
          <textarea
            type="text"
            name="message"
            className="form-control"
            value={message}
            onChange={changeMessage}
            placeholder="note"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <button
            className="btn-login btn btn-primary btn-block mt-2 login-do-btn"
            disabled={loading}
            onClick={addNewTicket}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Send</span>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tickets;
