import React from 'react';
import './App.css';
import {LoginPage} from "pages/login/LoginPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import MainPage from "pages/main/MainPage";
import InfoPage from "pages/info/InfoPage";

function App() {
  return (
    <div className="App">
		<Router>
			<div>
				<Route exact path="/">
					<LoginPage />
				</Route>
				<Route path="/main">
					<MainPage />
				</Route>
				<Route path="/info/:id?">
					<InfoPage />
				</Route>
			</div>
		</Router>

    </div>
  );
}

export default App;
