import React, { useState } from 'react';
import { Container, Tabs, Tab, ListGroup, Button, InputGroup, Form } from 'react-bootstrap';
import { BsPlusLg, BsTrash } from 'react-icons/bs';


const initialPlaylists = [
  { id: 1, name: 'Rock Clásico' },
  { id: 2, name: 'Top Hits 2025' },
  { id: 3, name: 'Para Concentrarse' },
];

export function Library() {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = (event) => {
    event.preventDefault();
    if (newPlaylistName.trim() === '') return;

    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName.trim(),
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
  };

  const handleDeletePlaylist = (idToDelete) => {
    const updatedPlaylists = playlists.filter(playlist => playlist.id !== idToDelete);
    setPlaylists(updatedPlaylists);
  };

  return (
    <div className="main-content">
      <Container fluid>
        <h1 className="mb-4">Mi Biblioteca</h1>

        <Form onSubmit={handleCreatePlaylist} className="mb-4" style={{ maxWidth: '400px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Nombre de la nueva playlist"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <Button variant="outline-success" type="submit" className="d-flex align-items-center justify-content-center">
              <BsPlusLg />
            </Button>
          </InputGroup>
        </Form>

        <Tabs defaultActiveKey="playlists" id="library-tabs" className="mb-3">
          <Tab eventKey="playlists" title="Playlists">
            <ListGroup variant="flush">
              {playlists.map((playlist) => (
                <ListGroup.Item 
                  key={playlist.id} 
                  className="bg-transparent text-white d-flex justify-content-between align-items-center"
                >
                  {playlist.name}
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeletePlaylist(playlist.id)}>
                    <BsTrash />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Tab>
          <Tab eventKey="albums" title="Álbumes">
            <p className="subtitle">Aquí aparecerán los álbumes que guardes.</p>
          </Tab>
          <Tab eventKey="artists" title="Artistas">
            <p className="subtitle">Aquí aparecerán tus artistas seguidos.</p>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};