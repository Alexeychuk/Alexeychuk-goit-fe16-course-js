import Notepad from '../index';

const initialNotes = [
    {
      id: 'id-1',
      title: 'JavaScript essentials',
      body:
        'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
      priority: Notepad.Priority.HIGH,
    },
    {
      id: 'id-2',
      title: 'Refresh HTML and CSS',
      body:
        'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
      priority: Notepad.Priority.NORMAL,
    },
  ];

describe('class Notepad',() => {
    let notepad;

    beforeEach(() => {
    notepad = new Notepad(initialNotes);         
        });

    afterEach(() => {
        notepad = null;
        });

    it('should be initialized with notes' , () => {
        expect(notepad.notes).toBe(initialNotes);
    });

    it('should return note with given id' , () => {
        const id = 'id-1';
        const note = {
            id: 'id-1',
            title: 'JavaScript essentials',
            body:
              'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
            priority: Notepad.Priority.HIGH,
          };
        expect(notepad.findNoteById(id)).toStrictEqual(note);
    });

    it('should  return undefined with unknown id' , () => {
        const id = 'id-6';
        expect(notepad.findNoteById(id)).toBe(undefined);
    });

    it('should  save note' , () => {
        const note  = {
            id: 'id-3',
            title: 'Get comfy with Frontend frameworks',
            body:
              'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
            priority: Notepad.Priority.NORMAL,
          };
        expect(notepad.saveNote(note)).toStrictEqual(note);
    });

    it('should  delete note' , () => {
        const id = 'id-1';
        const notes = [
            { 
              id: 'id-2',
              title: 'Refresh HTML and CSS',
              body:
                'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
              priority: Notepad.Priority.NORMAL,
            },
            {
                id: 'id-3',
                title: 'Get comfy with Frontend frameworks',
                body:
                  'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
                priority: Notepad.Priority.NORMAL,
              }
          ]
        expect(notepad.deleteNote(id)).toStrictEqual(notes);
    });

    it('should update note content' , () => {

        const note = notepad.updateNoteContent('id-3', {
            title: 'Get comfy with React.js or Vue.js',
          });

        const updatedNote = 
            {
                id: 'id-3',
                title: 'Get comfy with React.js or Vue.js',
                body:
                  'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
                priority: Notepad.Priority.NORMAL,
              } 
        

        expect(note).toStrictEqual(updatedNote);
    });

    it('should update note priority' , () => {

        const note = notepad.updateNotePriority('id-3', Notepad.Priority.LOW);

        const updatedNote = 
            {
                id: 'id-3',
                title: 'Get comfy with React.js or Vue.js',
                body:
                  'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
                priority: Notepad.Priority.LOW,
              }  
        

        expect(note).toStrictEqual(updatedNote);
    });

    it('should not update note priority with unknown priority' , () => {

        const note = notepad.updateNotePriority('id-3', Notepad.Priority.BIG);
        expect(note.priority).toStrictEqual(undefined);
    });

    it('should find array of notes by query' , () => {

        const notes = notepad.filterNotesByQuery('html');
        const queryArray = [
            {
              id: 'id-2',
              title: 'Refresh HTML and CSS',
              body:
                'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
              priority: Notepad.Priority.NORMAL,
            }
          ]
        expect(notes).toStrictEqual(queryArray);
    });


    it('should return undefined by unknown query' , () => {
        const notes = notepad.filterNotesByQuery('dddddd');
        expect(notes).toStrictEqual(undefined);
    });

    it('should return array filtered by priority' , () => {

        const notes = notepad.filterNotesByPriority(Notepad.Priority.NORMAL);
        const filteredNotes = [{
            id: 'id-2',
            title: 'Refresh HTML and CSS',
            body:
              'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
            priority: Notepad.Priority.NORMAL,
          }];
        console.log(notes);
        expect(notes).toStrictEqual(filteredNotes);
    });



})