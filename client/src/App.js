import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from "./pages/Home";
import Products from "./pages/Products";



function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
          </Routes>

        </div>
      </Router>
    </div>
    
  );
}

export default App;
