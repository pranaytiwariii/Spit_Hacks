import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EcoAIFinder from './components/EcoAIFinder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EcoAIFinder />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
