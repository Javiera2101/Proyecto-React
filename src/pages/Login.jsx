import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Login() {
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
              <Form.Label className="text-white">Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white">Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            
            <div className="d-grid gap-2">
                <Button variant="success" type="submit" size="lg">
                    Iniciar Sesión
                </Button>
            </div>
            <br />

            <p className="subtitle">
              Si no tienes cuenta,{" "}
              <Link
                  to="/register"
                  style={{textDecoration: "underline", color: "inherit"}}
              >
                regístrate
              </Link>{" "}
              para continuar.
            </p>

            <div className="text-center mt-3">
              <Link to="/" className="link small">Volver al inicio</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}