import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'; // 👈 1. Importa Outlet
import './css/style.css';
import './css/bootstrap.min.css';

// Componentes
import { Sidebar } from './components/Sidebar';
import { PlayerBar } from './components/PlayerBar';

// Páginas
import { MainContent } from './components/MainContent';
import { Login } from './pages/Login';
import Search from './pages/Search';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import {Register} from "./pages/Register";
import {Artista} from "./pages/Artista";
import {Genero} from "./pages/Genero";

const MainLayout = () => (
  <div className="app-container">
    <div className="main-content-wrapper">
      <Sidebar />
      <Outlet /> 
    </div>
    <PlayerBar />
  </div>
);

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainContent />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} /> {/* 👈 2. Añade la nueva ruta */}
        <Route path="profile" element={<Profile />} />
        <Route path="artista/:artistaId" element={<Artista />} />
        <Route path="genero/:generoId" element={<Genero />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}