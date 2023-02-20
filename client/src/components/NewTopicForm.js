import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { addTopic, addTopicToDB } from "../features/topics/topicsSlice";
import {NavLink} from "react-router-dom";


export default function NewTopicForm() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    // dispatch your add topic action here
    const uniqueId = uuidv4();

    dispatch(addTopicToDB({
      id: uniqueId,
      name: name, 
      icon: icon,
      quizIds: []
    }))

    dispatch(addTopic({
      id: uniqueId,
      name: name, 
      icon: icon,
      quizIds: []
    }))



    history.push(ROUTES.topicsRoute());
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
        <form onSubmit={handleSubmit}>
          <h1 className="center">Create a new topic</h1>
          <div className="form-section">
            <input
              id="topic-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Topic Name"

              required
            />
            <select
              onChange={(e) => setIcon(e.currentTarget.value)}
              required
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                Choose an icon
              </option>
              {ALL_ICONS.map(({ name, url }) => (
                <option key={url} value={url}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <button className="center">Add Topic</button>
        </form>
      </section>
    </>
  );
}
