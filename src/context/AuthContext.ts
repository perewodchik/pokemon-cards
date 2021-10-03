import {createContext} from "react";

function noop() {}

const AuthContext = createContext({
	email: "",
	login: noop as (email: string, password: string) => void,
	logout: noop,
	isAuthenticated: false,
	receiveOneTimePassword: noop as (value: string) => void,
	oneTimePasswordReceived: false
})

export default AuthContext