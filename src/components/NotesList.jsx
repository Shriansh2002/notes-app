import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className='notes-list'>
            {notes?.map((note, index) => (
                <Note
                    note={note}
                    key={note + index}
                    handleDeleteNote={handleDeleteNote}
                />
            ))}

            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default NotesList;