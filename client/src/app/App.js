import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import NewQuizForm from "../components/NewQuizForm";
import NewTopicForm from "../components/NewTopicForm";
import Topics from "../features/topics/Topics";
import Topic from "../features/topics/Topic";
import Quiz from "../features/quizzes/Quiz";
import Quizzes from "../features/quizzes/Quizzes";
import ROUTES from "./routes";
import { useDispatch } from "react-redux";
import { loadQuizzes } from "../features/quizzes/quizzesSlice";
import { loadTopics } from "../features/topics/topicsSlice";
import { loadCards } from "../features/cards/cardSlice";
import { Login } from "../features/login/Login";
import { SignUp } from "../features/signup/SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import { Authentication } from "../features/authentication/Authentication";
import PrivateRouteToLogin from "../components/PrivateRoute";
import PrivateRouteToAuth from "../components/PrivateRouteAuth";



export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQuizzes());
    dispatch(loadTopics());
    dispatch(loadCards());
  }, [])

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>

          <Route path="/register">
            <SignUp />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRouteToAuth path="/authentication" component={Authentication}/>


          <PrivateRouteToLogin path="/topics" component={TopicsRoutes}/>

          <PrivateRouteToLogin path="/quizzes" component={QuizRoutes} />
          
        </Switch>
      </AuthProvider>
    </Router>
  );
}

function TopicsRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewTopicForm />
        </Route>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={`${match.path}`}>
          <Topics />
        </Route>
      </Switch>
    </>
  );
}

function QuizRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewQuizForm />
        </Route>
        <Route path={`${match.path}/:quizId`}>
          <Quiz />
        </Route>
        <Route path={`${match.path}`}>
          <Quizzes />
        </Route>
      </Switch>
    </>
  );
}
