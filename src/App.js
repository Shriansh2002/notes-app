import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import { Container } from '@nextui-org/react';

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

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addNote = (text) => {
    const newNote = {
      id: nanoid(),
      text: text,
      date: new Date().toLocaleDateString()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes?.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`} >

      <Container fluid>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />

        {searchText && <h3>You Searched for {searchText} </h3>}

        <NotesList
          notes={notes?.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase()))
          }
          handleAddNote={addNote}
          handleDeleteNote={deleteNote} />
      </Container >

    </div >
  );
}

export default App;
