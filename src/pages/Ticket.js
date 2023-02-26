import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setCommend, showTickets} from "../network/cardsNet";

const Ticket = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [comment, setComment] = useState("");
  let {id} = useParams();

  let image_user = "default.png";
  const dispatch = useDispatch();

  useEffect(() => {
    showTickets(id)
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

  const sendComment = e => {
    const data = {
      comment: comment,
      ticket_id: id,
    };
    setCommend(data)
      .then(function (response) {
        console.log(response.data.data.comments);
        setContent(state => {
          return response.data.data;
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="row" style={{margin: "100px 0"}}>
      <div className="card col-lg-4">
        <div className="card-header">
          <h6 className="mb-0">{content.title}</h6>
        </div>
        <div className="card-body py-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="form-label">Ticket Code:</span>
                </div>
                <div className="col-6 text-end">#{content.ticket_id}</div>
              </div>
            </li>

            <li className="list-group-item px-0">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="form-label">Status:</span>
                </div>
                <div className="col-6 text-end">
                  {content.status === "open" ? (
                    <span className="badge p-2 bg-success  px-3 rounded ">
                      {content.status}
                    </span>
                  ) : (
                    <span className="badge p-2 bg-danger  px-3 rounded ">
                      {content.status}
                    </span>
                  )}
                </div>
              </div>
            </li>
            <li className="list-group-item px-0">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="form-label">Start Date:</span>
                </div>
                <div className="col-6 text-end">{content.created_at}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="col-md-12 col-lg-8"
        style={{border: "1px solid rgba(0, 0, 0, 0.175)", borderRadius: "5px"}}
      >
        <div className="comment">
          <div className="comment-author-ava">
            <img
              src={"https://dashboard.potipay.com/uploads/users/" + image_user}
              width="50"
              alt="Avatar"
            />
          </div>
          <div className="comment-body">
            <div className="comment-footer">
              <span className="comment-meta">user.name</span>
            </div>
            <p className="comment-text">{content.message}</p>
          </div>
        </div>

        {content.comments
          ? content.comments.map((item, index) => (
              <div key={index}>{item.comment}</div>
            ))
          : ""}

        <h5 className="mb-30 padding-top-1x">Leave Message</h5>

        <div className="form-group">
          <textarea
            className="form-control form-control-rounded"
            rows="6"
            placeholder="Write your message here..."
            required=""
            name="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            onClick={sendComment}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#EB455F",
              color: "#fff",
              padding: "5px",
              border: "0px",
              borderRadius: "3px",
            }}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            Submit Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
