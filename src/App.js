import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import About from './pages/About';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css';  // Fixed import path

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
        <Header 
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
