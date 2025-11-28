import { Routes, Route } from 'react-router-dom';
import MainView from './components/MainView';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainView />} />
    </Routes>
  );
}

export default App;
