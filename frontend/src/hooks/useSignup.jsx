import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const Signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:1290/api/user/signup", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();
        console.log(json)

        if (!response.ok) {
            setIsLoading(false);
            setError(json.msg)
        } else if (response.ok) {
            setIsLoading(false);
            //save the user to localStorage
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json })
        }
    }

    return { Signup, error, isLoading }
}