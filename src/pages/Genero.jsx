import {Container, Card, Button, Row, Col, ListGroup} from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { generos } from "../data/generos";
import {useNavigate, useParams} from "react-router-dom";

export function Genero() {
    const { generoId } = useParams();
    const navigate = useNavigate();

    const genero = generos.find(g => g.id === generoId);

    if (!genero) {
        return (
            <Container className="mt-5 text-center">
                <h2>Género no seleccionado</h2>
                    <Button variant="secondary" onClick={() => navigate(-1)} className="mt-3">
                        Volver
                    </Button>
            </Container>
        );
    }

    const canciones = [
        "Canción 1",
        "Canción 2",
        "Canción 3",
        "Canción 4",
        "Canción 5",
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                background: "linear-gradient(to bottom right, #1c8541, #191414)",
                color: "white",
                paddingTop: "2rem",
                paddingBottom: "2rem",
            }}
        >
            <Container>
                {/* Botón volver */}
                <Button variant="dark" onClick={() => navigate(-1)} className="mb-4">
                    <ArrowLeft size={16} /> Volver
                </Button>
                <br />
                <br />

                {/* Imagen + Nombre + Seguir */}
                <Row className="align-items-center mb-5">
                    <Col xs="auto" className="d-flex align-items-center">
                        {genero.Icono && (
                            <genero.Icono size={100} color={genero.color} />
                        )}
                    </Col>
                    <Col className="d-flex align-items-center">
                        <h1 style={{ marginLeft: "1rem" }}>{genero.nombre}</h1>
                    </Col>
                </Row>


                {/* Lista de canciones */}
                <h3>Canciones populares</h3>
                <ListGroup variant="flush" style={{ maxWidth: "700px" }}>
                    {canciones.map((cancion, index) => (
                        <ListGroup.Item
                            key={index}
                            style={{
                                background: "transparent",
                                color: "white",
                                borderBottom: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            {index + 1}. {cancion}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
}
