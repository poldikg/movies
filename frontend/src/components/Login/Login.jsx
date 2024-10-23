import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password)
    }

    return (
        <div>
            <form className="login" onSubmit={handleSubmit} >
                <h3 style={{ color: "white" }}>Login</h3>
                <label htmlFor="email-login">Email</label>
                <input type="email" name="email-login" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                <label htmlFor="password-login">Password:</label>
                <input type="password" name="password-login" onChange={(e) => { setPassword(e.target.value) }} value={password} />

                <button>Login</button>
            </form>
        </div>
    )
}

export default Login