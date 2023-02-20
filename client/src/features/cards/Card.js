import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { loadCards, selectCards } from "./cardSlice";




export default function Card({ id }) {
  const cards = useSelector(selectCards); // replace this with a call to your selector to get all the cards in state
  const [flipped, setFlipped] = useState(false);

  const {username} = useAuth();


  const _ = require("lodash")

  if (_.isEmpty(cards)) {
    return null;
  }

  console.log(cards)
  const card = cards[id];
  console.log(id)

  
  
  return (
    <>
      <li>
        <button className={flipped ? "card back" : "card front"}  onClick={(e) => setFlipped(!flipped)}>
          {flipped ? card.back : card.front}
        </button>
      </li>
  </>
  );
}
