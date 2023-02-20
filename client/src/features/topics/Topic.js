import NewTopicForm from "../../components/NewTopicForm";
import { Link, NavLink, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { loadTopics, selectTopics } from "./topicsSlice";
import { loadQuizzes, selectQuizzes } from "../quizzes/quizzesSlice";
import { useEffect } from "react";

export default function Topic() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTopics())
    dispatch(loadQuizzes())
  }, [])



  const topics = useSelector(selectTopics); // replace this with a call to your selector to select all the topics in state
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to select all the quizzes in state
  let { topicId } = useParams();
  const topic = topics[topicId];


  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);


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
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
    </>
  );
}
