export default class Notepad {
    constructor(notes = []){
       this._notes = notes; 
    }
  
    static Priority = { LOW: 0, NORMAL: 1, HIGH: 2,}
  
    get notes() {
      return this._notes;
    }
  
    findNoteById(id) {
      return new Promise ((resolve) => {
      setTimeout(()=> {  
        resolve( this._notes.find(note => note.id === id));
      },300);
    }) 
     
    }
  
    saveNote(note) {
      return new Promise ((resolve) => {
        setTimeout(()=> {
          this._notes.push(note);
          localStorage.setItem('notes', JSON.stringify(this._notes));
          resolve(note);
        },300);
      }) 
    }
  
    deleteNote(id) {
      return new Promise ((resolve) => {
        setTimeout(()=> {
          this._notes = this._notes.filter(note => note.id !== id);
          localStorage.setItem('notes', JSON.stringify(this._notes));
          resolve(id);
          
        },300);
      }) 
    }
  
    updateNoteContent(id, updatedContent) { 
      this.findNoteById(id).then((item) => {
          this._notes[this._notes.indexOf(item)] = 
          {...item, ...updatedContent}
      })}    
    
    updateNotePriority(id, priority) {
      return new Promise ((resolve) => {
        setTimeout(()=> {   
          resolve(this._notes.find(note => note.id === id).priority = priority); 
        },300);
      }) 
    }
  
    filterNotesByQuery(query) {
      return new Promise ((resolve) => {
        setTimeout(()=> { 
          const res = this._notes.filter(note => note.title.toLowerCase()
          .includes(query.toLowerCase()) ||
          note.body.toLowerCase()
          .includes(query.toLowerCase())); 
          resolve(res); 
        },300);
      }) 
    }
  
    filterNotesByPriority(priority) {
      return new Promise ((resolve) => {
        setTimeout(() => {
          resolve(this._notes.filter(note => note.priority === priority));
        },300);
      })
    }
  };