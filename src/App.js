import React from 'react';
import './App.css';
import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
import Login from "./Login"
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      <div className="app__body">
        {!user ? <Login /> : (<Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route exact path="/">
              <h1>Weclome to the Chat App</h1>
            </Route>
          </Switch>
        </Router>)}



      </div>
    </div>
  );
}

export default App;
