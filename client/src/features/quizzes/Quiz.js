import { Link, NavLink, useParams } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { loadQuizzes, selectQuizzes } from "./quizzesSlice";
import { loadTopics } from "../topics/topicsSlice";
import { useEffect } from "react";
import { loadCards } from "../cards/cardSlice";

export default function Topic() {

  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state


  let { quizId } = useParams();


  const _ = require("lodash")

  if (_.isEmpty(quizzes)) {
    return null;
  }

  const quiz = quizzes[quizId];
 


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
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <h1>Created By: {quiz.createdBy}</h1>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
    </>
  );
}
