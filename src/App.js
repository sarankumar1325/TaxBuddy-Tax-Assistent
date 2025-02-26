import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
        <h1>hello</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our React application!</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page of our application.</p>
    </div>
  );
}

export default App;
