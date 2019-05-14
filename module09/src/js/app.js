'use strict';

class Notepad {
  constructor(notes = []){
     this._notes = notes; 
  }

  static Priority = { LOW: 0, NORMAL: 1, HIGH: 2,}

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    this._notes.splice(this._notes.indexOf(this.findNoteById(id)), 1);
  }

  updateNoteContent(id, updatedContent) { 
    if (this.findNoteById(id)){  
    return  this._notes[this._notes.indexOf(this.findNoteById(id))] = {...this.findNoteById(id), ...updatedContent}
      
    }     
  }

  updateNotePriority(id, priority) {
   return this._notes.find(note => note.id === id).priority = priority;

  }

  filterNotesByQuery(query) {
    return this._notes.filter(note =>  note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase()));
  }

  filterNotesByPriority(priority) {
    return this._notes.filter(note => note.priority === priority);
  }
};


const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const REFS = {
  list:document.querySelector('ul.note-list'),
  form: document.querySelector('form.note-editor'),
  search: document.querySelector('form.search-form'),
  titleField: document.querySelector('input[name="note_title"]'),
  inputField: document.querySelector('textarea[name="note_body"]'),
  inputButton: document.querySelector('.note-editor button'),
  deleteButton: document.querySelector('button[data-action="delete-note"]'),
}

const notepad = new Notepad(initialNotes);

console.log('Все текущие заметки: ', notepad.notes);


const createNoteContent = note => {

  const content = document.createElement('div');
  content.classList.add("note__content");

  const title = document.createElement('h2');
  title.classList.add("note__title");
  title.textContent =  note.title; 

  const body = document.createElement('p');
  body.classList.add("note__body");
  body.textContent = note.body;

  content.append(...[title, body])

  return content;
}

const createActionButton = (action, iconType) => {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = action;

  const buttonInner = document.createElement('i');
  buttonInner.classList.add('material-icons');
  buttonInner.classList.add('action__icon');
  buttonInner.textContent = iconType;

  button.appendChild(buttonInner);
  
  return button;
}

const createNoteFooter = note => {

  const footer = document.createElement('footer');
  footer.classList.add("note__footer");

  const expandSection = document.createElement('section');
  expandSection.classList.add("note__section");

  const priority = document.createElement('span');
  priority.classList.add("note__priority");
  priority.textContent = note.priority;

  const editSection = document.createElement('section');
  editSection.classList.add("note__section");

  expandSection.append(...[
    createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY,ICON_TYPES.ARROW_DOWN),
    createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY,ICON_TYPES.ARROW_UP), 
    priority]);

  editSection.append(...[
    createActionButton(NOTE_ACTIONS.EDIT,ICON_TYPES.EDIT),
    createActionButton(NOTE_ACTIONS.DELETE,ICON_TYPES.DELETE)]);
  
  footer.append(...[expandSection,  editSection]);

  return footer;
  
}

const createListItem = note => {
    const item = document.createElement('li');
    item.classList.add("note-list__item");
    item.dataset.id = `${note.id}`;

    const noteOuter = document.createElement('div');
    noteOuter.classList.add("note");

    noteOuter.append(...[createNoteContent(note)], createNoteFooter(note) );
    item.appendChild(noteOuter);
    return item;
 }


 const renderNoteList = (listRef, notes) => {
  const itemArr = notes.map(note => createListItem(note));
  listRef.innerHTML = '';
  listRef.append(...itemArr);
  console.log(listRef);
  return listRef;

 }
 
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
  id: generateUniqueId(),
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


