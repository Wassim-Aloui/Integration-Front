import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/user/login", { email, password })
      .then((response) => {
        console.log("Token:", response.data.token);
        localStorage.setItem("token", response.data.token);
        
        // Navigate to the home route ("/") after successful login
        window.location.href = '/';
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data.error);
        // Handle login failure here, e.g., set an error message to display
        setErrorMessage("Login failed. Please check your credentials and try again.");
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
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
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
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </fieldset>
                      <Link to={"/register"}>
                        <h6 style={{ color: "white" }}>Click here to register</h6>
                      </Link>
                      <Link to={"/forgot"}>
                        <h7 style={{ color: "white" }}>Reset password</h7>
                      </Link>
                    </div>

                    <div className="col-md-12">
                      <fieldset>
                        <button type="submit" id="form-submit" className="button">
                          Log In
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
        <br></br>
        <br></br>
      </section>
      
      <Footer />
     
    </div>
  );
}

export default Login;