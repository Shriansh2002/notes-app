import Note from './Note';

const NotesList = ({ notes }) => {
    return (
        <div className='notes-list'>
            {notes.map((note, index) => (
                <Note note={note} key={note + index} />
            ))}
        </div>
    );
};

export default NotesList;