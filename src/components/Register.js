import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        setError("");

        // Make a POST request to the register route on your server
        axios.post("http://localhost:3000/user/register", { email, password })
            .then((response) => {
                // Handle the successful registration response
                console.log("Registration successful!");
                window.location = "/login";
                
            })
            .catch((error) => {
                // Handle errors (e.g., display error message to the user)
                setError(error.response.data.error);
                console.error("Registration failed:", error.response.data.error);
                
            });
    };

    return (
        <div>
            <NavBar />
            <section className="section coming-soon" data-section="section3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-xs-12"></div>
                        <div className="col-md-5">
                            <div className="right-content">
                                <div className="top-content">
                                    <h6>Register your free account </h6>
                                </div>
                                <form id="contact" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <fieldset>
                                                <input
                                                    name="email"
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Enter your email"
                                                    required=""
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </fieldset>
                                        </div>

                                        <div className="col-md-12">
                                            <fieldset>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </fieldset>
                                        </div>

                                        <div className="col-md-12">
                                            <fieldset>
                                                <input
                                                    name="confirmPassword"
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    placeholder="Confirm your password"
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </fieldset>
                                        </div>

                                        <div className="col-md-12">
                                            <fieldset>
                                                <button type="submit" id="form-submit" className="button">
                                                    Register
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>
                                {error && <p style={{color:"red"}} className="error-message">{error}</p>}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br>
            </section>
            <Footer />
        </div>
    );
}

export default Register;