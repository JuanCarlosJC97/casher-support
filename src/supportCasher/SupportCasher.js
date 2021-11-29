import React, { useState, useEffect } from 'react'
import { Container, Row, Col, FormLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import Logo from '../images/logo2.svg'
import Casher from '../images/casher.jpg'
import './SupportCasher.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);


export default function SupportCasher(props) {

    //Estados
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    //Para cambiar campos
    const [showId, setId] = useState('');
    const [showName, setName] = useState('');
    const [showLastName, setLastName] = useState('');
    const [showDateOfBirth, setDateOfBirth] = useState('');
    const [showEmailAddress, setEmailAddress] = useState('');
    const [showRol, setRol] = useState();
    const [showStatus, setStatus] = useState();
    const [showGender, setGender] = useState('');

    //GET cashers
    const [listCashiers, setListCashiers] = useState([]);
    useEffect(() => {
        getEventCashier();
    }, []);

    var getEventCashier = async function () {
        let resp = await fetch("http://localhost:3001/api/cashiers/",
            {
                method: "GET"
            }
        );
        let awResp = await resp.json();
        //const awResp2 = Array.from(awResp);
        //const awResp2 = Object.values(awResp);
        setListCashiers(awResp);
        return;
    };

    //DELETE cashier
    var deleteEventCashier = async function (id) {
        let resp = await fetch("http://localhost:3001/api/cashiers/" + id,
            {
                method: "DELETE"
            }
        );
        let auxResp = await resp.json();
        getEventCashier();
        await MySwal.fire({
            tittle: "<strong>" + auxResp.mssg + "</strong>",
            html: (auxResp.status === 1) ? <i>Cajero eliminado</i> : <i>ERROR</i>,
            icon: (auxResp.status === 1) ? 'success' : 'error'
        })
        return;
    };

    //Get ONE cashier
    var getEventOneCashier = async function (id) {
        let resp = await fetch("http://localhost:3001/api/cashiers/" + id,
            {
                method: "GET"
            }
        );
        let awResp = await resp.json();
        //const arrResp = Array.from(awResp);
        const arrResp = Object.values(awResp);

        let idUpdate = arrResp[0];
        let name = arrResp[1];
        let lastName = arrResp[2];
        let dateOfBirth = arrResp[3];
        let emailAddress = arrResp[4];
        let rol = arrResp[5];
        let status = arrResp[6];
        let gender = arrResp[7];

        setId(idUpdate);
        setName(name);
        setLastName(lastName);
        setDateOfBirth(dateOfBirth);
        setEmailAddress(emailAddress);
        setRol(rol);
        setStatus(status);
        setGender(gender);

        return;
    };

    //UPDATE cashier
    var updateEventCashier = async function (id) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let resp = await fetch("http://localhost:3001/api/cashiers/" + id,
            {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(
                    {
                        name: document.getElementById("nameUpdate").value,
                        lastName: document.getElementById("lastNameUpdate").value,
                        dateOfBirth: document.getElementById("dateOfBirthUpdate").value,
                        emailAddress: document.getElementById("emailAddressUpdate").value,
                        rol: document.getElementById("rolUpdate").value,
                        status: document.getElementById("statusUpdate").value,
                        gender: document.getElementById("genderUpdate").value
                    }
                )
            }
        );

        let auxResp = await resp.json();
        getEventCashier();
        await MySwal.fire({
            tittle: "<strong>" + auxResp.mssg + "</strong>",
            html: (auxResp.status === 1) ? <i>Cajero modificado</i> : <i>ERROR</i>,
            icon: (auxResp.status === 1) ? 'success' : 'error'
        })
        return;
    };

    //ADD cashier
    var addEventCashier = async function () {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let resp = await fetch("http://localhost:3001/api/cashiers",
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
        getEventCashier();
        await MySwal.fire({
            tittle: "<strong>" + auxResp.mssg + "</strong>",
            html: (auxResp.status === 1) ? <i>Cajero agregado</i> : <i>ERROR</i>,
            icon: (auxResp.status === 1) ? 'success' : 'error'
        })
        return;
    };

    function FormModalCashier(props) {
        return (
            <Modal {...props} className="modal" aria-labelledby="contained-modal-title-center">
                <Modal.Header closeButton>
                    <h1>Nuevo Cajero</h1>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <>

                        <FormLabel> Nombre *</FormLabel>
                        <FormControl id="name" />

                        <FormLabel> Apellidos *</FormLabel>
                        <FormControl id="lastName" />

                        <FormLabel> Fecha de nacimiento *</FormLabel>
                        <FormControl id="dateOfBirth" type="text" />

                        <FormLabel> Correo electrónico *</FormLabel>
                        <FormControl id="emailAddress" type="email" />

                        <FormLabel> Rol *</FormLabel>
                        <FormControl id="rol" type="text" />

                        <FormLabel> Estatus *</FormLabel>
                        <FormControl id="status" />

                        <FormLabel> Genero *</FormLabel>
                        <FormControl id="gender" />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <>
                        <Button variant="secondary">Cancelar</Button>
                        <Button variant="primary" onClick={addEventCashier}>Guardar</Button>
                    </>
                </Modal.Footer>
            </Modal >
        )
    }

    function FormModalCashierUpdate(props) {
        return (
            <Modal {...props} className="modal" aria-labelledby="contained-modal-title-center">
                <Modal.Header closeButton>
                    <h1>Modificar Cajero</h1>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <>
                        <FormLabel> Nombre *</FormLabel>
                        <FormControl id="nameUpdate" value={showName} onChange={(e) => setName(e.target.value)} />

                        <FormLabel> Apellidos *</FormLabel>
                        <FormControl id="lastNameUpdate" type="text" value={showLastName} onChange={(e) => setLastName(e.target.value)} />

                        <FormLabel> Fecha de nacimiento *</FormLabel>
                        <FormControl id="dateOfBirthUpdate" type="text" value={showDateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

                        <FormLabel> Correo electrónico *</FormLabel>
                        <FormControl id="emailAddressUpdate" type="email" value={showEmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />

                        <FormLabel> Rol *</FormLabel>
                        <FormControl id="rolUpdate" value={showRol} onChange={(e) => setRol(e.target.value)} />

                        <FormLabel> Estatus *</FormLabel>
                        <FormControl id="statusUpdate" value={showStatus} onChange={(e) => setStatus(e.target.value)} />

                        <FormLabel> Genero *</FormLabel>
                        <FormControl id="genderUpdate" value={showGender} onChange={(e) => setGender(e.target.value)} />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <>
                        <Button variant="secondary">Cancelar</Button>
                        <Button variant="primary" onClick={() => updateEventCashier(showId)}>Guardar</Button>
                    </>
                </Modal.Footer>
            </Modal >
        );
    }


    return (
        <Container className="supportCasher">
            <Row>
                <Col md={4} lg={4}>
                    <Image className="logo" src={Logo}></Image>
                </Col >
                <Col className="title" sm={6} md={4} lg={4}>
                    <h1>Catálogo de Cajeros</h1>
                </Col>
                <Col className="col-button-close" sm={4} md={4} lg={4}>
                    <Button className="mb-3 button-inicio" variant="link">Inicio</Button>
                    <Button className="mb-3 button-close" variant="primary">Cerrar sesión</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-end">
                <Col lg={11}>
                    <Button className="mb-3 add-casher" variant="light" onClick={() => { setShow(true) }}>Nuevo Cajero <FontAwesomeIcon className="icon-plus" icon={faPlus} /></Button>
                </Col>
            </Row>
            <Row>
                <Col xs={9} sm={12} md={12} lg={12}>
                    <Table className="table-cashers" bordered size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Fecha de nacimiento</th>
                                <th>Correo electrónico</th>
                                <th>Rol</th>
                                <th>Estatus</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCashiers.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.lastName}</td>
                                    <td>{product.dateOfBirth}</td>
                                    <td>{product.emailAddress}</td>
                                    <td>{product.rol}</td>
                                    <td>{product.status}</td>
                                    <td>
                                        <Button className="mb-3 add-product" variant="light" onClick={() => {
                                            getEventOneCashier(product._id);
                                            setShowUpdate(true);
                                        }}>
                                            ✏️
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className="mb-3 add-product" variant="light" onClick={() => deleteEventCashier(product._id)}>
                                            <FontAwesomeIcon className="icon-trash" icon={faTrashAlt} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="justify-content-md">
                <Col lg={12}>
                    <Image className="img-casher" src={Casher} roundedCircle></Image>
                </Col>
            </Row>
            <FormModalCashier
                show={show}
                onHide={() => setShow(false)}
            />
            <FormModalCashier
                show={showAdd}
                onHide={() => setShowAdd(false)}
            />
            <FormModalCashierUpdate
                show={showUpdate}
                onHide={() => setShowUpdate(false)}
            />
        </Container >
    )
}