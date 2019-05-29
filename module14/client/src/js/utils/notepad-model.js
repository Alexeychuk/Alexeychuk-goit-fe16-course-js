import * as api from "../../services/api";

export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  static Priority = { LOW: 0, NORMAL: 1, HIGH: 2 };

  async get() {
    try {
      const notes = await api.getNotes();
      return notes;
    } catch (error) {
      console.log("Status Text: " + error.response.status);
    }
  }

  async findNoteById(id) {
    const note = await this._notes.find(note => note.id === id);
    return note;
  }

  async saveNote(note) {
    try {
      const savedNote = await api.saveNote(note);
      this._notes.push(savedNote);
      return savedNote;
    } catch (error) {
      console.log("Status Text: " + error.response.status);
    }
  }

  async deleteNote(id) {
    try {
      const deletedNote = await api.deleteNote(id);
      this._notes = this._notes.filter(item => item.id !== id);
      return deletedNote.id;
    } catch (error) {
      console.log("Status Text: " + error.response.status);
    }
  }

  async updateNoteContent(id, updatedContent) {
    try {
      const updatedItem = await api.updateNote(id, updatedContent);
      this._notes[this._notes.indexOf(updatedItem)] = updatedItem;
    } catch (error) {
      console.log("Status Text: " + error.response.status);
    }
  }

  async updateNotePriority(id, priority) {
    try {
      const updatedItem = await api.updateNote(id, priority);
      this._notes[this._notes.indexOf(updatedItem)] = updatedItem;
    } catch (error) {
      console.log("Status Text: " + error.response.status);
    }
  }

  async filterNotesByQuery(query) {
    const res = await this.get();
    return res.filter(
      note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.body.toLowerCase().includes(query.toLowerCase())
    );
  }

  async filterNotesByPriority(priority) {
    const res = await this.get();
    return res.filter(note => note.priority === priority);
  }
}
