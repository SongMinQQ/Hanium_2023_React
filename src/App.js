import './App.css';
import CheckLogger from './CheckLogger';
import ReadPubkey from './ReadPubkey';
import ShowDatabase from './ShowDatabase';


function App() {
  return (
    <div className="App">
      <CheckLogger />
      <ShowDatabase/>
      <ReadPubkey />
    </div>
  );
}

export default App;
