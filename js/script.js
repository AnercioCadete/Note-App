/* A constant that will not be changed */
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

/* REPOPULATE AFTER REFRESHING THE APP */
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
  /* Method named CREATE ELEMENT */
  /* This is the way to add Elements and attributes */
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("doubleclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  /* REMOVE AN ELEMENT USING REMOVE.CHILD */
  appEl.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  /*FILTERING THE NOTES AND KNOW WHICH UPDATE THROUGH FILTER BY ID */
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  /* creation of note element */
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  /* INSERT BEFORE METHOD IN Js */
  appEl.insertBefore(noteEl, btnEl);
  /* METHOD TO SAVE THE NOTES IN THE LOCAL STORAGE */
  notes.push(noteObj);
  saveNote(notes);
}

function saveNote(note) {
  /* CHANGING THE ARRAY TO A STRING WITH JSON (CONVERTING) */
  localStorage.setItem("note-app", JSON.stringify(note));
}

/* SAVING IN THE LOCAL STORAGE IN DIFFENT KEYS */
function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

/* Addition of an button event */
btnEl.addEventListener("click", addNote);
