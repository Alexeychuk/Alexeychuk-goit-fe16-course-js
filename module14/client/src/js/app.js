import MicroModal from "micromodal";
import { Notyf } from "notyf";
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from "./utils/constants";
import Notepad from "./utils/notepad-model";
import { getRefs, renderNoteList, createListItem } from "./utils/view.js";
import noteTemplate from "../templates/note.hbs";

MicroModal.init();

const notyf = new Notyf();
const REFS = getRefs();
const notepad = new Notepad();
notepad.get().then(initialNotes => renderNoteList(REFS.list, initialNotes));

const addListItem = (listRef, note) => {
  listRef.insertAdjacentHTML("beforeend", noteTemplate(note));
};

const removeListItem = item => {
  item.remove();
};

const checkListItem = () => {
  if (!REFS.inputField.value || !REFS.titleField.value)
    return notyf.error("Необходимо заполнить все поля!");

  return true;
};

REFS.form.addEventListener("submit",async e => {
  e.preventDefault();
  if (checkListItem()) {
    const newNote = {
      title: REFS.titleField.value,
      body: REFS.inputField.value,
      priority: PRIORITY_TYPES.LOW
    };
    REFS.inputField.value = "";
    REFS.titleField.value = "";
    try{
     const savedNote = await notepad.saveNote(newNote);
    addListItem(REFS.list, savedNote);
    MicroModal.close("note-editor-modal");
    notyf.success("Заметка добавлена успешно!");  
    } catch (error) {
      notyf.error("Status Text: " + error.response.status);
    }           
  }
});

REFS.openButton.addEventListener("click", () => {
  MicroModal.show("note-editor-modal");
});

REFS.list.addEventListener("click", async e => {
  if (e.target.parentNode.dataset.action === "delete-note") {
    try{
      const deleteItem = await notepad.deleteNote(e.target.closest("li").dataset.id)
      removeListItem(e.target.closest("li"));
      notyf.success("Заметка удалена");
    } catch (error) {
      notyf.error("Status Text: " + error.response.status);
    }   
   
  }
});

REFS.search.addEventListener("input", async e => {
  try{const res = await notepad.filterNotesByQuery(e.target.value);
    renderNoteList(REFS.list, res);
  } catch {
    notyf.error("Status Text: " + error.response.status);
  }
  
  });


  

