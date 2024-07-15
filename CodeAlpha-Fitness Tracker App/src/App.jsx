import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import './styles.css'

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            targetpushup={noteItem.targetpushup}
            targetsitup={noteItem.targetsitup}
            actualpushup={noteItem.actualpushup} 
            actualsitup={noteItem.actualsitup}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}

    </div>
  );
}

export default App;
