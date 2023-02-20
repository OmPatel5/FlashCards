import { Axios } from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { addCard, addCardToDB } from "../features/cards/cardSlice";
import { createAndAssociateQuizWithTopicThunkActionCreator } from "../features/quizzes/quizzesSlice";
import { selectTopics } from "../features/topics/topicsSlice";
import {NavLink} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [topic_Id, setTopic_id] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);

  const {username} = useAuth();
  

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];


    cards.forEach((card) => {
      let cardsId = uuidv4();
      cardIds.push(cardsId)

      dispatch(addCard({
        id: cardsId,
        front: card.front, 
        back: card.back
      }))


      dispatch(addCardToDB({
        id: cardsId,
        front: card.front, 
        back: card.back
      }))
    })

    // create the new cards here and add each card's id to cardIds
    // create the new quiz here

    let uniqueId = uuidv4();

    console.log(username)

    dispatch(createAndAssociateQuizWithTopicThunkActionCreator({
      _id: topic_Id,
      id: uniqueId, 
      name: name, 
      topicId: topicId,
      cardIds: cardIds,
      createdBy: username
    }))

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <>
    <nav>
            <ul>
              <li>
                <NavLink to={ROUTES.topicsRoute()} activeClassName="active">
                  Topics
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.quizzesRoute()} activeClassName="active">
                  Quizzes
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.newQuizRoute()} activeClassName="active">
                  New Quiz
                </NavLink>
              </li>
            </ul>
      </nav>
    
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
          required
        />
        <select
          id="quiz-topic"
          onChange={(e) => {
            const topicIds = e.currentTarget.value.split(',');
            setTopicId(topicIds[0]);
            setTopic_id(topicIds[1])
          }}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={[
              topic.id, topic._id
            ]}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
    </>
  );
}
