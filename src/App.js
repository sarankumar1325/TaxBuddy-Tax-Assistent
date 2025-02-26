import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import About from './pages/About';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Learn from './pages/Learn';
import Notifications from './pages/Notifications';
import './App.css';

const AppContent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const handleLogout = () => setIsLoggedIn(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      {!isAuthPage && (
        <Header 
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
