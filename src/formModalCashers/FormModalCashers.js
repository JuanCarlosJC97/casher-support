import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FormControl, FormLabel } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import './FormModalCashers.css'
import Swal from 'sweetalert';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

var updateEventCash = async function () {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let resp = await fetch("http://localhost:3000/updateCashiers",
        {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(
                {
                    name: document.getElementById("name").value,
                    lastName: document.getElementById("lastName").value,
                    dateOfBirth: document.getElementById("dateOfBirth").value,
                    emailAddress: document.getElementById("emailAddress").value,
                    rol: document.getElementById("rol").value,
                    status: document.getElementById("status").value,
                    gender: document.getElementById("gender").value
                }
            )
        }
    );

    let auxResp = await resp.json();
    await MySwal.fire({
        tittle: "<strong>" + auxResp.mssg + "</strong>",
        html: (auxResp.status === 1) ? <i>Cajero modificado</i> : <i>ERROR</i>,
        icon: (auxResp.status === 1) ? 'success' : 'error'
    })
    return;
};

export default function FormModalCashers(props) {
    const [show, setShow] = useState(false);
    return (
        <Modal {...props} className="modal" aria-labelledby="contained-modal-title-center">
            <Modal.Header closeButton>
                <h1>Nuevo Cajero</h1>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <>
                    <FormLabel> Nombre *</FormLabel>
                    <FormControl id="name"></FormControl>

                    <FormLabel> Apellidos *</FormLabel>
                    <FormControl id="lastName"></FormControl>

                    <FormLabel> Fecha de Nacimiento *</FormLabel>
                    <FormControl id="dateOfBirth"></FormControl>

                    <FormLabel> Correo Electrónico *</FormLabel>
                    <FormControl id="emailAddress"></FormControl>

                    <FormLabel> Rol *</FormLabel>
                    <FormControl id="rol"></FormControl>

                    <FormLabel> Estatus *</FormLabel>
                    <FormControl id="status"></FormControl>

                    <FormLabel> Género *</FormLabel>
                    <FormControl id="gender"></FormControl>
                </>
            </Modal.Body>
            <Modal.Footer>
                <>
                    <Button variant="secondary" onClick={updateEventCash}>
                        Cancelar
                    </Button>
                    <Button variant="primary">
                        Guardar
                    </Button>
                </>
            </Modal.Footer>
        </Modal >
    )
}

//ADD CASHIER
var addEventCash = async function(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let resp = await fetch("http://localhost:3000/addCashiers",
        {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(
                {
                    name: document.getElementById("name").value,
                    lastName: document.getElementById("lastName").value,
                    dateOfBirth: document.getElementById("dateOfBirth").value,
                    emailAddress: document.getElementById("emailAddress").value,
                    rol: document.getElementById("rol").value,
                    status: document.getElementById("status").value,
                    gender: document.getElementById("gender").value
                }
            )
        }
    );

    let auxResp = await resp.json();
    await MySwal.fire({
        tittle: "<strong>"+auxResp.mssg+"</strong>",
        html: (auxResp.status === 1) ? <i>Cajero agregado</i> : <i>ERROR</i>,
        icon: (auxResp.status ===1) ? 'success' : 'error'
    })
    return;
};


// DELETE CASHIER
var addEventCash = async function(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let resp = await fetch("http://localhost:3000/deleteCashiers",
        {
            method: "DELETE",
            headers: myHeaders,
            body: JSON.stringify(
                {
                    emailAddress: document.getElementById("emailAddress").value
                }
            )
        }
    );

    let auxResp = await resp.json();
    await MySwal.fire({
        tittle: "<strong>"+auxResp.mssg+"</strong>",
        html: (auxResp.status === 1) ? <i>Cajero eliminado</i> : <i>ERROR</i>,
        icon: (auxResp.status ===1) ? 'success' : 'error'
    })
    return;
};