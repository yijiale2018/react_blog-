//配置路由
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login";
import Home from './home'
import AdminIndex from './adminIndex'
import ArticleList from "./ArticleList";

function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login}></Route>
      <Route path="/index"  component={AdminIndex}></Route>
    </Router>
  );
}


export default Main