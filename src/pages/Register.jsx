import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Register() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#121212' }}>
            <Row>
                <Col md={12}>
                    <div className="text-center mb-4">
                        <img 
                            src="/images/logo.png" 
                            alt="Logo de prueba" 
                            style={{ width: '250px' }} 
                        />
                        <p className="subtitle">Inicia sesión para continuar</p>
                    </div>
                    <Form style={{ width: '320px' }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-white">Nombre de usuario</Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-white">Correo Electrónico</Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Ingresa nuevamente tu contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" size="lg">
                                Registrarme
                            </Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}