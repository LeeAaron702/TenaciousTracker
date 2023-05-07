import { useState, useContext, useEffect } from "react";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const user = useUser(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      e.target.reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      closeModal();
    }
  }, [user, navigate]);

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
              <h5 className="modal-title">Log Into Tenacious Tracker</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-md-5"></div>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-floating mb-3">
                      <input
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div>
                      <button className="btn btn-primary" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
