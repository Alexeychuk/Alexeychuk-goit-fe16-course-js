export default class Notepad {
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