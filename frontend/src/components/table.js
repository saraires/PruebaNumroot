import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import Filter from "./filter";
import ModalUserInfo from "../modals/ModalUserInfo";
import ModalInfoEdit from "../modals/ModalInfoEdit";
import ModalDelete from "../modals/ModalDelete";

const Table = ({ isAdmin }) => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [showInfoModal, setShowInfoModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('/users')
            .then((res) => {
                setData(res.data)
                setFilteredData(res.data)
            }).catch(() => { });
    }, []);

    const openModal = () => setShowInfoModal(true);
    const closeModal = () => setShowInfoModal(false);

    const editModal = (user) => {
        setSelectedUser(user)
        setShowEditModal(true)
    };

    const closeEditModal = () => setShowEditModal(false);

    const deleteModal = (user) => {
        setSelectedUser(user)
        setShowDeleteModal(true)
    };

    const closeDeleteModal = () => setShowDeleteModal(false);


    const oldest = data.length > 0
        ? data.reduce((prev, current) => (prev.age > current.age ? prev : current), data[0])
        : "";

    const oldestPersonName = oldest ? oldest.first_name + (oldest.second_name != null ? " " + oldest.second_name : "") : "Todavia no hay registros";

    const avg = data.length > 0
        ? Math.round(data.reduce((sum, user) => sum + user.age, 0) / data.length)
        : 0;

    const userInfo = {
        total: data.length,
        male: data.filter((data) => data.gender === "male").length,
        female: data.filter((data) => data.gender === "female").length,
        old: oldestPersonName,
        avg: avg
    };

    return (
        <div>
            <div className="card border rounded shadow-lg bg-light p-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title">Tabla de usuarios</h3>
                        <button className="btn btn-warning" onClick={openModal}>Info</button>
                    </div>
                    <Filter data={data} setFilteredData={setFilteredData} />
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Documento</th>
                                    <th scope="col" className="col-md-3">Full Name</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email Address</th>
                                    <th scope="col">House Address</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                    {isAdmin && <th>Acciones</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.document}>
                                        <td>{item.document}</td>
                                        <td>{
                                            item.first_name + (item.second_name != null ? " " + item.second_name : "") + " " +
                                            item.first_surname + (item.second_surname != null ? " " + item.second_surname : "")}
                                        </td>
                                        <td>{item.phone}</td>
                                        <td>{item.mail}</td>
                                        <td>{item.adress}</td>
                                        <td>{item.age}</td>
                                        <td>{item.gender}</td>
                                        {isAdmin && (
                                            <td>
                                                <button className="btn btn-warning m-2" onClick={() => { editModal(item) }}>Editar</button>
                                                <button className="btn btn-danger m-2" onClick={() => { deleteModal(item) }}>Eliminar</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    </div>
                </div>
            </div>
            <ModalUserInfo
                show={showInfoModal}
                handleClose={closeModal}
                userInfo={userInfo}
            />
            <ModalInfoEdit
                show={showEditModal}
                handleClose={closeEditModal}
                user={selectedUser}
            />
            <ModalDelete
                show={showDeleteModal}
                handleClose={closeDeleteModal}
                user={selectedUser}
            />
        </div >
    )
}

export default Table;