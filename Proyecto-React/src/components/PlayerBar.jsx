import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { BsPlayCircleFill, BsSkipStartFill, BsSkipEndFill, BsShuffle, BsRepeat } from 'react-icons/bs';

export function PlayerBar() {
  return (
    <div className="player-bar">
      <Row className="w-100 align-items-center">
        <Col md={3}>
          <h6>Nombre de la Canción</h6>
          <p className="mb-0 small text-muted">Artista</p>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <BsShuffle className="mx-3" size={20} />
            <BsSkipStartFill className="mx-3" size={28} />
            <BsPlayCircleFill className="mx-3" size={40} />
            <BsSkipEndFill className="mx-3" size={28} />
            <BsRepeat className="mx-3" size={20} />
          </div>
          <ProgressBar now={60} variant="success" style={{ height: '4px' }} />
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};
