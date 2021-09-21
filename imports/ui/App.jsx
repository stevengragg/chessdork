import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data'

// Pages
import Home from "./pages/home/Home"
import Welcome from "./pages/welcome/Welcome"
import Login from "./pages/auth/Login"
import Lesson from "./pages/lesson/Lesson"
import Tips from "./pages/tips/Tips"
import ChapterList from "./pages/chapterlist/ChapterList"
import VariationList from "./pages/variations/VariationList"
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'

//Components
export const App = () => {
  const user = useTracker(() => Meteor.user());

 
  return (

    <Suspense fallback={<b>Loading…</b>}>

      <div className="">

        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/learn">
              <Home />
            </Route>
            <Route exact path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/learn/:openingId/tips">
              <Tips />
            </Route>
            <Route exact path="/chapters/:openingId/:levelId">
              <ChapterList />
            </Route>
            <Route exact path="/chapters/:openingId/:levelId/:lessonId/variations">
              <VariationList />
            </Route>
            <Route exact path="/auth/login">
              {user ? <Redirect to="" /> : <Login />}
              <Login />
            </Route>
            <Route exact path="/:lessonMode/:openingId/:levelId/:lessonId">
              {user? <Lesson /> : <Redirect to="" />}
            </Route>
            <Route exact path="/:lessonMode/:openingId/:levelId/:lessonId/:variationId">
               <Lesson /> 
              {/* {user? <Lesson /> :  <Redirect to="" />} */}
            </Route>
          </Switch>

        </Router>
      </div>
    </Suspense>
  )

};
