import React from "react";
import { useReducer, createContext } from "react";

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

    console.log("Auth Context:", state)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthProvider