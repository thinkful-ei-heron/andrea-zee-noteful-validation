import React, { Component } from 'react';
import { Route, Switch }from 'react-router-dom';
import Mainpage from './Mainpage';
import Header from './Header';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import FolderView from './FolderView';
import NoteView from './NoteView';
import './dummy-store'
import './css/App.css'
import UserContext from './UserContext';

class App extends Component {

  state = {
    notes: [],
    folders: [],
  }
  
  deleteNote= noteId =>{
    const newNotes = this.state.notes.filter(item =>
      item.id !== noteId
      )
      this.setState({
        notes: newNotes
      })
  }

  addFolder = folderName =>{
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      body: JSON.stringify({name: folderName}),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => this.setState({folders: [...this.state.folders, data]}))
    }

    addNote = (name, content, modified, folderId, id) => {
      const noteToAdd = [{
        name: name,
        content: content,
        id: id,
        modified: modified,
        folderId: folderId
      }]
      this.setState({
        notes: [...this.setState.notes, noteToAdd]
        // notes: this.state.notes.concat(noteToAdd)
      });
    }

  componentDidMount() {
    const folderUrl= 'http://localhost:9090/folders';
    const notesUrl='http://localhost:9090/notes';

    fetch(folderUrl)
      .then(res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(res => this.setState({
        folders:res,
      }))
      .catch(error => console.log(error.message));

      fetch(notesUrl)
      .then(res => {
        if(!res.ok){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(res => this.setState({
        notes: res,
      }))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <UserContext.Provider value={{
        notes: this.state.notes,
        folders: this.state.folders,
        deleteRequest: this.deleteNote,
        addNote: this.addNote
      }}>
        <main className='App'>
          <Route path='' component={Header} />
          <Switch>
            <Route path='/addNote' component={AddNote}/>
            <Route path='/folder/:folderid/note/:noteid/' render={(props) => <><NoteView {...props}/></>}/>
            <Route path='/folder/:folderid/' render={(props)=> {
              return <FolderView {...props} addFolder={this.addFolder}/>}} />
            <Route exact path='/' render={(props)=> {
              return <Mainpage {...props} addFolder={this.addFolder}/>
            }} />
          </Switch>
        </main>
      </UserContext.Provider>
    );
  }

}

export default App;