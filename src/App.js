import './App.css';
import CheckLogger from './CheckLogger';
import MenuBar from './MenuBar';
//import ReadPubkey from './ReadPubkey';
import ShowDatabase from './ShowDatabase';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <MenuBar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
