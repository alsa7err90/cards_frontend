import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LodaingSpinner from "../components/LodaingSpinner";
import {motion} from "framer-motion";

function GetewayPage() {
  let {id} = useParams();
  const [spinner, setSpinner] = useState(true);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  function postGift() {
    if ((account !== "") & (selected !== 0)) {
      setLoading(true);
      const data = {
        wid: selected,
        acc: account,
        cc: "1",
      };
    } else {
      alert("you should select card and write email ");
    }
  }
  function selectCard(id) {
    console.log(id);
    setSelected(id);
    setSpinner(false);
  }
  useEffect(() => {
    setSpinner(false);
    // setCards(result.items)
  }, []);
  return (
    <>
      <div className="content">
        {spinner ? (
          <LodaingSpinner />
        ) : (
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.7}}
          >
            <main>
              <h2>Welcome to the GetewayPage!</h2>
              <p>You can do this, I believe in you.</p>
            </main>

            {cards.map(number => (
              <li
                onClick={() => selectCard(number.id)}
                className={selected === number.id ? "activeCard" : ""}
              >
                {number.amount}
              </li>
            ))}
            <br />
            <input
              value={account}
              onChange={e => setAccount(e.target.value)}
              type="text"
            />
            <br />
            {loading ? "loading...." : <></>}
            <button onClick={postGift}>buy now</button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default GetewayPage;
