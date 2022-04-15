import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import ProductList from './pages/ProductList';

function App() {
  return (
    <div  className="my-20 md:mx-44 mx-4 ipad-pro:mx-10 ipad:mx-10">
       <Router>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
