import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import SignUp from "./Signup";
import LoginForm from "./Login";

function Nav() {
    const { token } = useContext(AuthContext);
    const user = useUser(token);
    const { logout } = useToken();
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setLoginModal] = useState(false)


    const handleSignUpClick = () => {
        setShowSignUpModal(true);
    };

    const handleSignUpModalClose = () => {
        setShowSignUpModal(false);
    };

    const handleLoginClick = () => {
        setLoginModal(true);
    };

    const handleLoginModalClose = () => {
        setLoginModal(false);
    };


    return (
        <>
            <nav id="nav" className="navbar fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-bold" to="dashboard">
                        Tenacious Tracker
                    </NavLink>
                    <div className="d-flex ms-auto">
                        {token && user ? (
                            <button className="btn fw-bolder" onClick={logout}>
                                Logout
                            </button>
                        ) : (
                            <div className="row">
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn fw-bolder"
                                        onClick={handleSignUpClick}
                                    >
                                        Signup
                                    </button>
                                    <button
                                        type="button"
                                        className="btn fw-bolder"
                                        onClick={handleLoginClick}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {showSignUpModal && (
                <SignUp closeModal={handleSignUpModalClose} />
            )}
            {showLoginModal && (
                <LoginForm closeModal={handleLoginModalClose} />
            )}

        </>
    );
}

export default Nav;
