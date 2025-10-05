import React from 'react';
import { Nav } from 'react-bootstrap';
// 👇 Importamos Link y un nuevo ícono
import { Link } from 'react-router-dom';
import { BsHouseDoorFill, BsSearch, BsCollectionFill, BsBoxArrowInRight } from 'react-icons/bs';
import { VscAccount } from "react-icons/vsc"

export function Sidebar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        {/* Usamos 'as={Link}' para que los Nav.Link se comporten como links de React Router */}
     <Nav className="flex-column">
        <img 
              src="/images/logo.png" 
              alt="Logo de prueba" 
              style={{ width: '200px' }} 
            />
        <Nav.Link as={Link} to="/"><BsHouseDoorFill className="me-2" /> Inicio</Nav.Link>
        <Nav.Link as={Link} to="/search"><BsSearch className="me-2" /> Buscar</Nav.Link> 
        <Nav.Link as={Link} to="/library"><BsCollectionFill className="me-2" /> Tu Biblioteca</Nav.Link>
        </Nav>
      </Nav>
      <hr style={{ backgroundColor: '#b3b3b3' }} />
      <Nav className="flex-column">
        <Nav.Link href="#playlist1">Mi Playlist #1</Nav.Link>
        <Nav.Link href="#playlist2">Mi Playlist #2</Nav.Link>
      </Nav>

        <Nav className="flex-column">
            <hr style={{ backgroundColor: '#b3b3b3' }} />
            <Nav.Link as={Link} to="/profile">
                <VscAccount className="me-2" /> Mi Perfil
            </Nav.Link>
        </Nav>

      {/* 👇 Usamos 'mt-auto' para empujar este elemento al final */}
      <Nav className="flex-column mt-auto">
        <hr style={{ backgroundColor: '#b3b3b3' }} />
        <Nav.Link as={Link} to="/login">
            <BsBoxArrowInRight className="me-2" /> Iniciar Sesión
        </Nav.Link>
      </Nav>
    </div>
  );
}