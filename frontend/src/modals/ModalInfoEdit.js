import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axios/axios';
import { Modal } from "react-bootstrap";

const ModalInfoEdit = ({ show, handleClose, user }) => {

    const schema = yup.object().shape({
        document: yup.string().required("Document number is required").matches(/^\d{8,10}$/, 'The document number must contain between 8 and 10 digits'),
        firstName: yup.string().required("First name is required").matches(/^[a-zA-Z\s]*$/, 'No special characters are allowed in the first name'),
        secondName: yup.string().matches(/^[a-zA-Z\s]*$/, 'No special characters are allowed in the second name'),
        firstSurname: yup.string().required('First surname is required').matches(/^[a-zA-Z\s]*$/, 'No special characters are allowed in the first surname'),
        secondSurname: yup.string().matches(/^[a-zA-Z\s]*$/, 'No special characters are allowed in the second surname'),
        phone: yup.string().nullable().notRequired().matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits', excludeEmptyString: true, }),
        mail: yup.string().email('Must be a valid e-mail address'),
        adress: yup.string().required('House address is required').min(5, 'Address must be at least 5 characters long'),
        age: yup.number().required('Age is required').transform((value) => (isNaN(value) ? undefined : value)).positive('Age must be a positive number').integer('Age must be an integer').max(100, 'Age must be less than or equal to 100'),
        gender: yup.string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Invalid gender selection')
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        if (show && user) {
            reset({
                document: user.document || '',
                firstName: user.first_name || '',
                secondName: user.second_name || '',
                firstSurname: user.first_surname || '',
                secondSurname: user.second_surname || '',
                phone: user.phone || '',
                mail: user.mail || '',
                adress: user.adress || '',
                age: user.age || '',
                gender: user.gender || ''
            });
        }
    }, [user, show, reset]);

    const onSubmit = data => {
        const token = sessionStorage.getItem('authToken');

        axios.put(`/editUser/${data.document}`, data, {
            headers: {
                'Authorization': token,
            }
        })
            .then(() => {
                toast.success("Registro completado");
                reset();
                handleClose()
                window.location.reload();
            })
            .catch((e) => {
                toast.error("Ha ocurrido un error, por favor vuelve a intentarlo");
                console.error(e.response.data);
            })
    };

    return (
        <Modal show={show} onHide={handleClose} centered style={{ backdropFilter: "blur(2px)" }}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Información</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ToastContainer />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input {...register("document")} type="number" className="form-control" id="document" placeholder="Document *" />
                        <p className="text-danger px-2 mt-1">{errors.document?.message}</p>
                    </div>
                    <div>
                        <input {...register("firstName")} type="text" className="form-control" id="firstName" placeholder="First Name *" />
                        <p className="text-danger px-2 mt-1">{errors.firstName?.message}</p>
                    </div>
                    <div>
                        <input {...register("secondName")} type="text" className="form-control" id="secondName" placeholder="Second Name" />
                        <p className="text-danger px-2 mt-1">{errors.secondName?.message}</p>
                    </div>
                    <div>
                        <input {...register("firstSurname")} type="text" className="form-control" id="firstSurname" placeholder="First Surname *" />
                        <p className="text-danger px-2 mt-1">{errors.firstSurname?.message}</p>
                    </div>
                    <div>
                        <input {...register("secondSurname")} type="text" className="form-control" id="secondSurname" placeholder="Second Surname" />
                        <p className="text-danger px-2 mt-1">{errors.secondSurname?.message}</p>
                    </div>
                    <div>
                        <input {...register("phone")} type="number" className="form-control" id="phone" placeholder="Phone Number *" />
                        <p className="text-danger px-2 mt-1">{errors.phone?.message}</p>
                    </div>
                    <div>
                        <input {...register("mail")} type="email" className="form-control" id="mail" placeholder="E-mail Address" />
                        <p className="text-danger px-2 mt-1">{errors.mail?.message}</p>
                    </div>
                    <div>
                        <input {...register("adress")} type="text" className="form-control" id="adress" placeholder="House Address *" />
                        <p className="text-danger px-2 mt-1">{errors.adress?.message}</p>
                    </div>
                    <div>
                        <input {...register("age")} type="number" className="form-control" id="age" placeholder="Age *" />
                        <p className="text-danger px-2 mt-1">{errors.age?.message}</p>
                    </div>
                    <div>
                        <select {...register("gender")} className="form-select" id="gender *">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <p className="text-danger px-2 mt-1">{errors.gender?.message}</p>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Actualizar</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalInfoEdit;