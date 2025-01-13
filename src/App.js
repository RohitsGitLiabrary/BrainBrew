import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Homepage from './Pages/Homepage';
import Roommanager from './Pages/Roommanager';
import Waitinglobby from './Pages/Waitinglobby';
import Quizpage from './Pages/Quizpage';
import Winnerpage from './Pages/Winnerpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Roommanager" element={<Roommanager />} />
        <Route path="/Waitinglobby" element={<Waitinglobby />} />
        <Route path="/Quizpage" element={<Quizpage />} />
        <Route path="/Winnerpage" element={<Winnerpage />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
