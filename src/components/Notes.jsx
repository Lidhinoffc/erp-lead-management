import { useState } from "react";

export default function Notes({ notes = [], onSave }) {
  const [newNote, setNewNote] = useState("");

  function addNote() {
    if (!newNote.trim()) return;

    const updated = [
      ...notes,
      {
        id: Date.now(),
        text: newNote,
        createdBy: "Admin",
        createdDate: new Date().toISOString().split("T")[0],
      },
    ];

    onSave(updated);

    setNewNote("");
  }

  function deleteNote(id) {
    const updated = notes.filter(
      (note) => note.id !== id
    );

    onSave(updated);
  }

  function editNote(id) {
    const value = window.prompt("Edit note");

    if (!value) return;

    const updated = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            text: value,
          }
        : note
    );

    onSave(updated);
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Notes
      </h2>

      <div className="flex gap-3 mb-6">

        <input
          value={newNote}
          onChange={(e) =>
            setNewNote(e.target.value)
          }
          placeholder="Add a note..."
          className="
            flex-1
            border
            rounded-lg
            px-4
            py-2
          "
        />

        <button
          onClick={addNote}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            rounded-lg
          "
        >
          Add
        </button>

      </div>

      {notes.length === 0 ? (

        <p className="text-gray-500">
          No notes available.
        </p>

      ) : (

        <div className="space-y-4">

          {notes.map((note) => (

            <div
              key={note.id}
              className="
                border
                rounded-lg
                p-4
                bg-gray-50
              "
            >

              <p className="mb-3">
                {note.text}
              </p>

              <p className="text-sm text-gray-500">
                Created By: {note.createdBy}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Date: {note.createdDate}
              </p>

              <button
                onClick={() => editNote(note.id)}
                className="
                  bg-yellow-500
                  hover:bg-yellow-600
                  text-white
                  px-3
                  py-1
                  rounded
                  mr-2
                "
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteNote(note.id)
                }
                className="
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-3
                  py-1
                  rounded
                "
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}