import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNote }) => {
    return (
        <div className='notes-list'>
            {notes.map((note, index) => (
                <Note note={note} key={note + index} />
            ))}

            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default NotesList;