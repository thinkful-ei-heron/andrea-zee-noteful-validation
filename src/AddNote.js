import React from 'react'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'


export default class AddNote extends React.Component {

    static sontextType= UserContext;

    state= {
        note: {
            name: '',
            content: '',
            folderId: '',
            modified: ''
        }
    }

    setName =(input) =>{
        const createNote= this.state.note
        createNote.name= input
        createNote.modified= new Date ()
        this.setState({note: createNote})
    }
    setContent=(input) =>{
        const createNote= this.state.note
        createNote.content= input
        this.setState({note: createNote})
    }
    setId=(input) =>{
        const createNote= this.state.note
        createNote.folderId= input
        this.setState({note: createNote})
    }
    handleNewNote =(addNote) =>{
        const input= this.state.note
        const data= JSON.stringify({
            name: `${input.name}`,
            content: `${input.content}`,
            folderId: `${input.folderId}`,
            modified: `${input.modified}`
        })
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: data
        })
        .then(res => {
            if(!res.ok){
              throw new Error(res.status)
            }
            return res.json()
          })
          .then(data => {
            console.log(data.name)
            console.log(data.id)
            addNote(data.name, data.content, data.modified, data.folderId, data.id)
            return data
          })
          .catch(error => {
            console.error(error)
          })
    }
    render() {
        return (
            <form>
                <label htmlFor='note'> Note Name</label>
                <input id= 'name' type= 'text' value={this.state.note.name} onChange = {e => {
                    this.setName(e.target.value)
                }}/>
                <input id='content' type= 'text' value= {this.state.note.content}
                onChange= {e => this.setContent(e.target.value)}/>
                <select id='folderId'
                onChange= {e => this.setId(e.target.value)}>
                <option value=''>Select a Folder</option>
                {/* {this.context.folders.map(index =>
                <option key={index.id} value={index.id}>{index.name}</option>)} */}
                </select>
                <select>
                    <Link to='/' type='submit' onClick={e => {
                        e.preventDefault()
                        this.handleNewNote(
                            this.context.addNote
                        )
                        this.props.history.push('/')
                    }}>
                    Submit
                    </Link>
                </select>
            </form>
        )
    }
}
