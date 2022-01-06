import "./App.css";
import { Note } from "./components/note";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("new Note");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      setNotes([...res.data]);
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes([...notes, noteObject]);
    setNewNote("");
  };

  const handleOnChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div className="App">
      <h1>Note</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note content={note.content} key={note.id} />
        ))}
      </ul>
      <form>
        <input value={newNote} onChange={handleOnChange} />
        <button type={"submit"} onClick={addNote}>
          save
        </button>
        <button type={"button"} onClick={setShowAll.bind(this, !showAll)}>
          {showAll ? "show important" : "show all"}
        </button>
      </form>
    </div>
  );
}

export default App;
