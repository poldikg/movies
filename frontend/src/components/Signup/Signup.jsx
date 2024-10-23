import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { Signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(error)
        await Signup(email, password)
    }

    return (
        <div>
            <form className="signup" onSubmit={handleSubmit} >
                <h3 style={{ color: "white" }}>Signup</h3>
                <label htmlFor="email-signup">Email</label>
                <input type="email" name="email-signup" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                <label htmlFor="password-signup">Password:</label>
                <input type="password" name="password-signup" onChange={(e) => { setPassword(e.target.value) }} value={password} />

                <button disabled={isLoading}>Sign up</button>
                {error && <div style={{ color: "red" }} className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup