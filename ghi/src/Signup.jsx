import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/signup`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      try {
        await login(username, password);
        setUsername("");
        setPassword("");
        navigate("/dashboard");
        closeModal();
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      console.error("Error creating Client; Please try again");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        onClick={closeModal}
      >
        <div
          className="modal-dialog modal modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">SignUp for Tenacious Tracker</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-md-12">
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          required
                          placeholder="username"
                        />
                        <label htmlFor="username">Username</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <button className="btn btn-primary" type="submit">
                        Sign Up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
