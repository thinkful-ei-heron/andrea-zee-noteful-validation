import React, { Component } from 'react';
import { Route, Switch }from 'react-router-dom';
import Mainpage from './Mainpage';
import Header from './Header';
// import AddFolder from './AddFolder';
// import AddNote from './AddNote';
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


// addNote =(addNote) =>{
//         const input= this.state.note
//         const data= JSON.stringify({
//             name: `${input.name}`,
//             content: `${input.content}`,
//             folderId: `${input.folderId}`,
//             modified: `${input.modified}`
//         })
//         fetch(`http://localhost:9090/notes`, {
//             method: 'POST',
//             headers: {'content-type': 'application/json'},
//             body: data
//         })
//         .then(res => {
//             if(!res.ok){
//               throw new Error(res.status)
//             }
//             return res.json()
//           })
//           .then(data => {
//             console.log(data.name)
//             console.log(data.id)
//             addNote(data.name, data.content, data.modified, data.folderId, data.id)
//             return data
//           })
//           .catch(error => {
//             console.error(error)
//           })


    addNote = noteName =>{
      fetch(`http://localhost:9090/notes`, {
        method: 'POST',
        body: JSON.stringify({name: noteName}),
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
      .then(data => this.setState({notes: [...this.state.notes, data]}))
      }



    // addNote = (name, content, modified, folderId, id) => {
    //   const noteToAdd = [{
    //     name: name,
    //     content: content,
    //     id: id,
    //     modified: modified,
    //     folderId: folderId
    //   }]
    //   this.setState({
    //     notes: [...this.setState.notes, noteToAdd]
    //     // notes: this.state.notes.concat(noteToAdd)
    //   });
    // }

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
      }}>
        <main className='App'>
          <Route path='' component={Header} />
          <Switch>
            <Route path='/folder/:folderid/note/:noteid/' render={(props) => <><NoteView {...props} addNote={this.addNote}/></>}/>
            <Route path='/folder/:folderid/' render={(props)=> {
              return <FolderView {...props} addFolder={this.addFolder}/>}} />
            <Route exact path='/' render={(props)=> {
              return <Mainpage {...props} addFolder={this.addFolder}/>
            }} />
          </Switch>
        </main>
      </UserContext.Provider>
    )
  }

}

export default App;