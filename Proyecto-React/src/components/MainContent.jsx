import React, {useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {Mic2, Music, Guitar, Disc3, Headphones, Drum} from "lucide-react";
import { Artista } from "../pages/Artista";
import { Genero } from "../pages/Genero";
import {useNavigate} from "react-router-dom";
import { artistas } from "../data/artistas";
import { generos } from "../data/generos";

export function MainContent() {
  const navigate = useNavigate();

  const albums = Array(12).fill({
    title: "Nombre del Álbum",
    artist: "Nombre del Artista",
    imgUrl: "https://images.vexels.com/media/users/3/131549/isolated/preview/90d83e106c1c76aff84c6c6fb88892db-icono-de-nota-musical-plana.png"
  });

  return (
    // El div principal ya tiene la clase 'main-content'
    <div className="main-content">
      {/* Eliminamos el <Header /> de aquí */}
      <Container fluid>
        <h2>Lanzamientos Populares</h2>
        <br/>
        <Row>
          {/* El resto del código de las tarjetas de álbumes sigue igual... */}
          {albums.map((album, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
                <Card bg="dark" text="white" className="h-100">
                  <Card.Img variant="top" src={album.imgUrl}/>
                  <Card.Body>
                    <Card.Title>{album.title}</Card.Title>
                    <Card.Text>{album.artist}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
        <br/>

        <h2 className="mb-4">Artistas Populares</h2>
        <Row>
          {artistas.map((artista) => (
              <Col
                  key={artista.id}
                  onClick={() => navigate(`/artista/${artista.id}`, { state: { artistas } })}
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  className="mb-4 d-flex justify-content-center"
              >
                <Card
                    bg="transparent"
                    text="light"
                    className="text-center shadow-sm"
                    style={{
                      width: "150px",
                      height: "200px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      border: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <img
                        src={artista.foto}
                        alt={artista.nombre}
                        className="rounded-circle mb-3"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                    <Card.Text>{artista.nombre}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>

        <br/>
        <h2 className="mb-4">Géneros Musicales</h2>
        <Row>
          {generos.map((genero) => (
              <Col
                  key={genero.id}
                  onClick={() => navigate(`/genero/${genero.id}`)}
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  className="mb-4 d-flex justify-content-center"
              >
                <Card
                    bg="dark"
                    text="light"
                    className="text-center shadow-sm"
                    style={{
                      width: "120px",
                      height: "120px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    {genero.Icono && (
                        <div className="mb-3">
                          <genero.Icono size="32" color={genero.color} />
                        </div>
                    )}
                    <Card.Text className="mt-2">{genero.nombre}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
