import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axios/axios';
import { useForm } from 'react-hook-form';
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalLogin = ({ show, handleClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        axios.post("/api/admin/login", {
            user: data.user,
            pass: data.pass,
        }).then((data) => {
            sessionStorage.setItem('authToken', data.data.authToken);
            navigate("/admin")
            reset();
            handleClose();
        }).catch((e) => {
            toast.error("Ha ocurrido un error al iniciar sesion, vuelve a intentarlo");
        })
    }

    return (
        <Modal show={show} onHide={handleClose} centered style={{ backdropFilter: "blur(2px)" }}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label>Usuario</label>
                        <input {...register("user")} type="text" placeholder="Ingresa tu usuario" className="form-control" />
                        <p className="text-danger px-2 mt-1">{errors.user?.message}</p>
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input {...register("pass")} type="password" placeholder="Ingresa tu contraseña" className="form-control" />
                        <p className="text-danger px-2 mt-1">{errors.pass?.message}</p>
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>
            </Modal.Body>
            <ToastContainer />
        </Modal>
    )
}

export default ModalLogin;