import { useState } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';

function App() {
  const [notes, setNotes] = useState([{
    id: nanoid(),
    text: 'This is my first Note!',
    date: "15/04/2022"
  }, {
    id: nanoid(),
    text: 'This is my second Note!',
    date: "11/09/2021"
  }, {
    id: nanoid(),
    text: 'This is my third Note!',
    date: "13/06/2020"
  }]);

  return (
    <div className="container">
      <NotesList notes={notes} />
    </div>
  );
}

export default App;
