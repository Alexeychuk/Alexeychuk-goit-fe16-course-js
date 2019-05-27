import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, } from './constants.js';
import noteTemplate from '../../templates/note.hbs';

export const getRefs = () => ({
    list:document.querySelector('ul.note-list'),
    form: document.querySelector('form.note-editor'),
    search: document.querySelector('form.search-form'),
    titleField: document.querySelector('input[name="note_title"]'),
    inputField: document.querySelector('textarea[name="note_body"]'),
    openButton: document.querySelector('button[data-action="open-editor"]'),
    deleteButton: document.querySelector('button[data-action="delete-note"]'),

});

export const renderNoteList = (listRef, notes) => {
    const itemArr = notes.map(note => noteTemplate(note)).join('');
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend',itemArr);
    return listRef;
   }

   

  