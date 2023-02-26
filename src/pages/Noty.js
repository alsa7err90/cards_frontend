import React, {useState} from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNoty} from "../network/pagesNet";
import {setNewCountNoty, setNewNoty} from "../redux/actions/userActions";
import LodaingSpinner from "../components/LodaingSpinner";
import {IoMdNotificationsOutline} from "react-icons/io";

const Noty = () => {
  const noties = useSelector(state => state.userReducer.noty);
  const [spinner, setSpinner] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    getNoty().then(function (response) {
      console.log(response.data.user);
      dispatch(setNewNoty(response.data.data.noty));
      dispatch(setNewCountNoty(response.data.data.countNoty));
      setSpinner(false);
    });
  }, []);

  return (
    <>
      {spinner ? (
        <LodaingSpinner />
      ) : (
        <>
          <div class="notification-ui_dd-content" dir="rtl">
            {noties.map((noty, index) => (
              <a href="#!" key={index} className="notification_container">
                <IoMdNotificationsOutline size={25} />
                <div className="notification-list text-dark">
                  <div class="notification-list_img"></div>
                  <div class="notification-list_detail">
                    <p>
                      <b>{noty.data.title}</b> <br />{" "}
                    </p>
                    <p class="nt-link text-truncate"> {noty.data.message}</p>
                  </div>
                  <p>
                    <small>
                      {new Date(noty.data.created_at).toLocaleDateString()}{" "}
                    </small>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Noty;
