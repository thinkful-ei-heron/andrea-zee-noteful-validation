import React, { Component } from 'react'
import Folder from './Folder'
import './dummy-store'
import UserContext from './UserContext'
import './css/FolderList.css'
import AddFolder from './AddFolder'

export default class FolderList extends Component {  
  static contextType = UserContext;
  state = { 
    addingFolder: false
  }

  handleClick = () => {
    if( this.state.addingFolder === false) {
      this.setState({addingFolder: true})
    } else {
      this.setState({addingFolder: false})
    }
  }
  

  render() {
    let folders = this.context.folders;
    if(this.props.selectedNote){
      folders = folders.filter(folder => folder.id === this.props.selectedId)
    }
    return (
      <div className="folderlist">
        {folders.map(folder =>
          <Folder id={folder.id} key={folder.id} name={folder.name}/>
        )}

        {this.props.selectedNote ? <></> : <button className="add-folder" onClick={e => this.handleClick(e)}>Add Folder</button>}
        {this.state.addingFolder ? <AddFolder addFolder={this.props.addFolder}/> : <></>}
      </div>
    )
  }
}
