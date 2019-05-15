import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './utils/constants';

import  initialNotes from '../assets/notes.json';

import Notepad from './utils/notepad-model';

import {getRefs, renderNoteList, createListItem} from './utils/view.js';

const shortid = require('shortid');

const REFS = getRefs();

const notepad = new Notepad(initialNotes);

renderNoteList(REFS.list, notepad.notes);

 const addListItem = (listRef, note) => {
    listRef.appendChild(createListItem(note));
  }
  
 const removeListItem = (item) => {
    notepad.deleteNote(item.dataset.id);
    item.remove();
  }

const checkListItem = () => {
  
  if (!REFS.inputField.value || !REFS.titleField.value) return alert('Необходимо заполнить все поля!');
  const newNote = {
  id: shortid.generate(),
  title: REFS.titleField.value,
  body: REFS.inputField.value,
  priority: PRIORITY_TYPES.LOW,} 

  notepad.saveNote (newNote);
   
  addListItem(REFS.list, newNote);

  REFS.inputField.value = '';
  REFS.titleField.value = '';
}

REFS.form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkListItem();
});

REFS.list.addEventListener('click', (e) => {
if (e.target.parentNode.dataset.action === 'delete-note') 
removeListItem(e.target.closest('li')); 
});

REFS.search.addEventListener('input', (e) => {
renderNoteList(REFS.list, notepad.filterNotesByQuery(e.target.value));
});


