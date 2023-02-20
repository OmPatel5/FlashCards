import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { loadQuizzes, selectQuizzes } from "./quizzesSlice";
import {NavLink} from "react-router-dom";
import Profile from "../../components/Profile";

export default function Quizzes() {

  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state
  
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
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.id} to={ROUTES.quizRoute(quiz.id)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
    <div className="profile">
        <Profile />
    </div>
    </>
  );
}
