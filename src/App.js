import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import { Container } from '@nextui-org/react';
import db from './firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, getDocs } from "firebase/firestore";
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const user = auth.currentUser;

  const addNote = async (text) => {
    let someID = nanoid();
    const newNote = {
      id: someID,
      text: text.charAt(0).toUpperCase() + text.slice(1),
      date: new Date().toLocaleDateString()
    };
    await setDoc(doc(db, 'Notes', someID), newNote);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "Notes", id));
  };

  const editNote = async (id, Newtext) => {
    const myDocRef = doc(db, 'Notes', id);
    await setDoc(myDocRef, {
      id: id,
      text: Newtext.charAt(0).toUpperCase() + Newtext.slice(1),
      date: new Date().toLocaleDateString()
    }, { merge: false });
  };

  const handleDeleteAllNotes = async () => {
    const querySnap = await getDocs(collection(db, 'Notes'));

    querySnap.forEach((document) => {
      // console.log(doc.data().id);
      deleteDoc(doc(db, 'Notes', document.data().id));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`user is present`);
      }
      else {
        console.log(`no user`);
      }
    });

    const q = query(collection(db, 'Notes'), orderBy("text"));
    onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>

      <Container fluid>
        <Header user={user} />
        <Search handleSearchNote={setSearchText} />

        {searchText && <h3>You Searched for {searchText} </h3>}

        <NotesList
          notes={notes?.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase()))
          }
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleEditNote={editNote}
          handleDeleteAllNotes={handleDeleteAllNotes}
        />
      </Container >

    </div >
  );
};

export default App;
