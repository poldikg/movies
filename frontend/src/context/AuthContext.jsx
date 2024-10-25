import React from "react";
import { useReducer, createContext, useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {

    if (action.type === "LOGIN") {
        return { user: action.payload }
    }
    else if (action.type === "LOGOUT") {
        return { user: null }
    }
    else {
        return state
    }

}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, [])

    console.log("Auth Context:", state)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthProvider