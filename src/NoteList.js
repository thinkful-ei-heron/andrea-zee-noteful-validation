import React, { Component } from 'react'
import Note from './Note'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'
import './css/NoteList.css'

export default class NoteList extends Component {
  static contextType = UserContext
  state={
    addingNote: false
  }

  render() {
    let notes = this.context.notes

    if(this.props.selectedNote){
      notes = notes.filter(note => note.id === this.props.selectedNote)

    }else {
    if(this.props.selectedId){
      notes = notes.filter(note => note.folderId === this.props.selectedId)
    }
    else{
      notes = this.context.notes
    }
  }

    return (
      <div className="notelist">
        <div>
          {
            notes.map(note => 
              <Note key={note.id}
              id={note.id}
              name={note.name}
              modified={note.modified}
              folderId={note.folderId}
              content={note.content}
              selectedNote={this.props.selectedNote} />)
            }
        </div>
        {this.props.selectedNote ? <></> : <Link to ='/addNote' className= 'add-note' addNote={this.props.addNote} >Add Note</Link>}
      </div>
    )
  }
}
