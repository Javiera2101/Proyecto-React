import React from 'react';
import {Container, Button, Card, CardBody} from 'react-bootstrap';
import { Edit } from "lucide-react";
import profilePic from "../profilepic.jpg";

export function Profile() {
    return (
        <Container fluid className="align-items-center justify-content-center">
            <br />
            <h1 className="mb-4 text-center">Mi Perfil</h1>
            <br />
            <br />
            {/* Contenedor horizontal (imagen + detalles) */}
            <div className="d-flex flex-row align-items-center gap-5 justify-content-center">
                {/* Columna de la foto y alias */}
                <div className="d-flex flex-column align-items-center text-center">
                    <img
                        src={profilePic}
                        alt="Foto de perfil"
                        className="rounded-circle border border-4"
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                    <p className="text-gray-400 mt-2">@alias_usuario</p>
                </div>

                {/* Tarjeta de detalles */}
                <Card className="bg-gray-800 border-gray-700 shadow w-100" style={{ maxWidth: "450px" }}>
                    <CardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="text-xl font-semibold mb-0">Detalles</h2>
                            <Button variant="ghost" size="icon">
                                <Edit className="w-5 h-5" />
                            </Button>
                        </div>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <span className="fw-semibold">Correo:</span> usuario@ejemplo.com
                            </li>
                            <li className="mb-2">
                                <span className="fw-semibold">Miembro desde:</span> Enero 2025
                            </li>
                            <li className="mb-2">
                                <span className="fw-semibold">Playlists creadas:</span> 5
                            </li>
                            <li>
                                <span className="fw-semibold">Canciones favoritas:</span> 120
                            </li>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )

}