import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "react-bootstrap";
import axios from "../axios/axios";

const ModalDelete = ({ show, handleClose, user }) => {

    function onDelete() {
        const token = sessionStorage.getItem('authToken');

        axios.delete(`/deleteUser/${user.document}`, {
            headers: {
                'Authorization': token,
            }
        })
            .then(() => {
                toast.success("Eliminado exitosamente");
                handleClose()
                window.location.reload();
            })
            .catch((e) => {
                toast.error("Ha ocurrido un error, por favor vuelve a intentarlo");
            })
    };

    return (
        <Modal show={show} onHide={handleClose} centered style={{ backdropFilter: "blur(2px)" }}>
            <Modal.Header closeButton>
                <Modal.Title>¿Estas seguro?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <button className="btn btn-primary m-2" onClick={() => { handleClose() }}>Cancelar</button>
                <button type="submit" className="btn btn-danger m-2" onClick={() => { onDelete() }}>eliminar</button>
            </Modal.Body>
            <ToastContainer />
        </Modal>
    )
}

export default ModalDelete;