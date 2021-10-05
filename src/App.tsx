import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import LoginPage from "pages/login/LoginPage";
import ConfirmPage from "pages/confirm/ConfirmPage";
import MainPage from "pages/main/MainPage";
import InfoPage from "pages/info/InfoPage";
import AuthContext from "context/AuthContext";
import './App.scss'

const storageName = 'userData'

function App()
{
	const [email, setEmail] = useState("")
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [oneTimePasswordReceived, setOneTimePasswordReceived] = useState(false)

	const login = (email: string, password: string) => {
		//should be server checked
		if (email === "kode@kode.ru" && password === "Enk0deng")
		{
			setEmail(email)
			setIsAuthenticated(true)
			// "true" since we correctly got here
			localStorage.setItem(storageName, JSON.stringify({
				email, isAuthenticated: "true", oneTimePasswordReceived: String(oneTimePasswordReceived)
			}))

		} else
		{
			throw Error("Такого пользователя не существует")
		}
	}

	const logout = () => {
		setEmail("")
		setIsAuthenticated(false)
		setOneTimePasswordReceived(false)
		localStorage.removeItem(storageName)
	}

	const receiveOneTimePassword = (value: string) => {
		if (value === "4242")
		{
			setOneTimePasswordReceived(true)
			localStorage.setItem(storageName, JSON.stringify({
				email, isAuthenticated: "true", oneTimePasswordReceived: "true"
			}))
		} else
		{
			throw Error("Введенный СМС-код не соответствует отправленному на номер телефона")
		}
	}

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName) as string)
		if (data) {
			setEmail(data.email)
			setIsAuthenticated(data.isAuthenticated === "true")
			setOneTimePasswordReceived(data.oneTimePasswordReceived === "true")
		}
	}, [])

	return (
		<div className="App">
			<AuthContext.Provider value={{
				email,
				login,
				logout,
				receiveOneTimePassword,
				isAuthenticated,
				oneTimePasswordReceived
			}}>
				<Router basename="/pokemon-cards">
					{isAuthenticated && oneTimePasswordReceived
						?
						<Switch>
							<Route exact path="/main">
								<MainPage/>
							</Route>
							<Route exact path="/info/:id?">
								<InfoPage/>
							</Route>
							<Redirect to="/main"/>
						</Switch>
						:
						<Switch>
							<Route path="/confirm">
								<ConfirmPage/>
							</Route>
							<Route exact path="/">
								<LoginPage/>
							</Route>
							<Redirect to="/"/>
						</Switch>
					}
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
