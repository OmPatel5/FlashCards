import NewTopicForm from "../../components/NewTopicForm";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { loadTopics, selectTopics } from "./topicsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {NavLink} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Profile from "../../components/Profile";

export default function Topics() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(loadTopics())
  }, [])

  const topics = useSelector(selectTopics); // replace this with a call to your selector to select all the topics in state
  


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
        <h1>Topics</h1>
        <ul className="topics-list">
          {Object.values(topics).map((topic) => (
            <li className="topic" key={topic.id}>
            <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
            <div className="topic-container">
              <img src={topic.icon} alt="" />
              <div className="text-content">
                <h2>{topic.name}</h2>
                <p>{topic.quizIds.length} Quizzes</p>
              </div>
            </div>
          </Link>
            </li>
          ))}
        </ul>
        <Link
          to={ROUTES.newTopicRoute()}
          className="button create-new-topic-button"
        >
          Create New Topic
        </Link>
      </section>
      
      <div className="profile">
        <Profile />
      </div>
    </>
  );
}
