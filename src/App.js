import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import { Container } from '@nextui-org/react';
import db from './firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');

  const addNote = async (text) => {
    let someID = nanoid();
    const newNote = {
      id: someID,
      text: text,
      date: new Date().toLocaleDateString()
    };
    await setDoc(doc(db, 'Notes', someID), newNote);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "Notes", id));
  };

  useEffect(() => {
    const q = query(collection(db, 'Notes'), orderBy("text"));
    onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>

      <Container fluid>
        <Header />
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
