import { artistas } from "../data/artistas";
import { useParams, useNavigate } from "react-router-dom";
import {Container, Card, Button, Col, Row, ListGroup} from "react-bootstrap";
import { ArrowLeft } from "lucide-react";


export function Artista() {
    const { artistaId } = useParams();
    const navigate = useNavigate();

    const artista = artistas.find(a => a.id === artistaId);

    if (!artista) {
        return (
            <Container className="mt-5 text-center">
                <h2>Artista no encontrado</h2>
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

                {/* Imagen + Nombre + Seguir */}
                <Row className="align-items-center mb-5">
                    <Col xs="auto">
                        <img
                            src={artista.foto}
                            alt={artista.nombre}
                            className="rounded-circle"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                        />
                    </Col>
                    <Col>
                        <div style={{ marginLeft: "2rem" }}>
                            <h1 style={{ marginBottom: "1rem", marginTop: "100px" }}>{artista.nombre}</h1>
                            <Button variant="dark" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                                + Seguir
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Descripción */}
                <p style={{ maxWidth: "700px", marginBottom: "3rem", fontSize: "1.1rem", lineHeight: "1.5" }}>
                    {artista.descripcion}
                </p>

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
