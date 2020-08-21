import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Alert from "./components/layout/Alert";
import {Provider} from 'react-redux';
import Dashboard from './components/dashboard';
import CreateProfile from './components/Profile-Forms/CreateProfile';
import store from "./components/Store";
import {loadUser} from "./components/Actions/auth";
import setAuthToken from './components/Utils/setAuthToken';
import PrivateRoute from './components/routing/private';
import EditProfile from './components/Profile-Forms/editprofile';
import EditExperience from './components/Profile-Forms/AddExperience';
import EditEducation from './components/Profile-Forms/AddEducation';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Post from './components/Post';


if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () =>{
  useEffect(() =>{
      store.dispatch(loadUser());
  },[]);

  return(
  <Provider store={store}>
  <Router>
  <>
    <Navbar/>
    <Route exact path ="/" component = {Landing}/>
    <section className="container">
    <Alert/>
      <Switch>
          <Route exact path="/register" component = {Register}/>
          <Route exact path="/login" component = {Login}/>
          <Route exact path="/profiles" component = {Profiles}/>
          <Route exact path="/profile/:id" component = {Profile}/>
          <PrivateRoute exact path="/dashboard" component = {Dashboard}/>
          <PrivateRoute exact path="/create-profile" component = {CreateProfile}/>
          <PrivateRoute exact path="/edit-profile" component = {EditProfile}/>
          <PrivateRoute exact path="/edit-experience" component = {EditExperience}/>
          <PrivateRoute exact path="/edit-education" component = {EditEducation}/>
          <PrivateRoute exact path="/posts" component = {Posts}/>
          <PrivateRoute exact path="/post/:id" component = {Post}/>
      </Switch>
  </section>
  </>
  </Router>
</Provider>)
}

export default App;
