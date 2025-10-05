import React from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';

const Search = () => {
  return (
    <div className="main-content">
      <Container fluid>
        <h1 className="mb-4">Buscar</h1>
        <Form className="d-flex" style={{ maxWidth: '600px' }}>
          <FormControl
            type="search"
            placeholder="¿Qué quieres escuchar?"
            className="me-2"
            aria-label="Buscar"
          />
          <Button variant="outline-success">Buscar</Button>
        </Form>
        {/* Aquí podrías mostrar los resultados de la búsqueda en el futuro */}
      </Container>
    </div>
  );
};

export default Search;