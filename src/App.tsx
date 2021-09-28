import React from 'react';
import './App.css';
import {LoginPage} from "./pages/login/LoginPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
		<Router>
			<div>
				<Route exact path="/">
					<LoginPage />
				</Route>
				<Route path="/news">
					<LoginPage />
				</Route>
			</div>
		</Router>

    </div>
  );
}

export default App;
