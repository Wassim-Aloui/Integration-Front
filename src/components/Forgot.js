import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Forgot() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(""); 

    axios
      .post("http://localhost:3000/user/resetPwd", { email })
      .then((response) => {
        console.log(response.data);
        if (response.data.exists) {
          window.location.href = "/resetPassword";
        } else {
          setSuccessMessage("Email sent successfully");
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while processing your request.");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
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
                  <h6>Reset your password</h6>
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12">
                      <fieldset>
                        <button type="submit" id="form-submit" className="button">
                          Send
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
                {errorMessage && <p style={{color:"red"}} className="error-message">{errorMessage}</p>}
                {successMessage && <p style={{color:"green"}} className="success-message">{successMessage}</p>}
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
        <br></br><br></br>
      </section>
      <Footer />
    </div>
  );
}

export default Forgot;