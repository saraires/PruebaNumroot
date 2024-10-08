import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../modals/ModalLogin";

const Navbar = ({ isAdmin }) => {

    const navigate = useNavigate();
    const [modal, setModal] = useState(false)

    const login = () => setModal(true);
    const closeModal = () => setModal(false);

    const logout = () => {
        sessionStorage.clear()
        navigate("/");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Prueba Técnica</a>
                    <div className="d-flex">
                        <a className="navbar-brand" href="/algoritmo">Algoritmo</a>
                        {isAdmin ? (
                            <button className="btn btn-outline-light" type="button" href="/" onClick={logout}>
                                Logout
                            </button>
                        ) : (
                            <button className="btn btn-outline-light" type="button" href="/login" onClick={login}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <ModalLogin
                show={modal}
                handleClose={closeModal}
            />
        </>

    )
}

export default Navbar;