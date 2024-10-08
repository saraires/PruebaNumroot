import { Modal } from "react-bootstrap";
import React from "react";

const ModalUserInfo = ({ show, handleClose, userInfo }) => {

    return (
        <Modal show={show} onHide={handleClose} centered style={{ backdropFilter: "blur(2px)" }}>
            <Modal.Header closeButton>
                <Modal.Title>Información de usuarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body>
                    <p><strong>Total de usuarios:</strong> {userInfo.total}</p>
                    <p><strong>Hombres:</strong> {userInfo.male}</p>
                    <p><strong>Mujeres:</strong> {userInfo.female}</p>
                    <p><strong>Persona con mayor edad:</strong> {userInfo.old}</p>
                    <p><strong>Edad promedio:</strong> {userInfo.avg}</p>
                </Modal.Body>
            </Modal.Body>
        </Modal>
    )
}

export default ModalUserInfo