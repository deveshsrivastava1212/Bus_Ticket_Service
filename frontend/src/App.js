
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
    
    <div style={{ overflowX: "hidden" }}>
    <Navbar />
    </div>
    </BrowserRouter>
    
  );
}

export default App;
