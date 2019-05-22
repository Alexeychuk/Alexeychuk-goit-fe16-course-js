import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './utils/constants';
import  servNotes from '../assets/notes.json';
import Notepad from './utils/notepad-model';
import {getRefs, renderNoteList, createListItem} from './utils/view.js';
import noteTemplate from '../templates/note.hbs';

MicroModal.init();
const initialNotes = localStorage.getItem('notes') ?
JSON.parse(localStorage.getItem('notes')) : servNotes; 


const notyf = new Notyf();
const shortid = require('shortid');
const REFS = getRefs();
const notepad = new Notepad(initialNotes);

//console.log(renderNoteList(REFS.list, notepad.notes));

renderNoteList(REFS.list, notepad.notes);

 const addListItem = (listRef, note) => {
    listRef.insertAdjacentHTML('beforeend',noteTemplate(note));
  }
  
 const removeListItem = (item) => {
   item.remove();
    // notepad
    // .deleteNote(item.dataset.id)
    // .then(item.remove());

  }

const checkListItem = () => {
  
  if (!REFS.inputField.value || !REFS.titleField.value) return notyf.error('Необходимо заполнить все поля!');
  const newNote = {
  id: shortid.generate(),
  title: REFS.titleField.value,
  body: REFS.inputField.value,
  priority: PRIORITY_TYPES.LOW,} 

  notepad
  .saveNote(newNote)
  .then(savedNote => {
      addListItem(REFS.list, savedNote);
    }
  )
   
  REFS.inputField.value = '';
  REFS.titleField.value = '';
  return true;
}

REFS.form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkListItem()) {
    MicroModal.close('note-editor-modal');
    notyf.success('Заметка добавлена успешно!');
  };
  
});

REFS.openButton.addEventListener('click', () => {
 MicroModal.show('note-editor-modal');
  });

REFS.list.addEventListener('click', (e) => {
if (e.target.parentNode.dataset.action === 'delete-note') {
notepad
    .deleteNote(e.target.closest('li').dataset.id)
    .then(() => {
       removeListItem(e.target.closest('li')); 
        notyf.success('Заметка удалена');
    }); 
}
});

REFS.search.addEventListener('input', (e) => {
  notepad.filterNotesByQuery(e.target.value)
  .then((res)=> { renderNoteList(REFS.list, res) })

});


