import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Admin from './pages/admin';
import AuthGuard from './components/authGuard';
import Algoritmo from './pages/algoritmo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algoritmo" element={<Algoritmo />} />
          <Route path="/admin"
            element={
              <AuthGuard NoAuthComponent={< Navigate to="/" />}>
                <Admin />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
