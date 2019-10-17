import React, { Component } from 'react';
import FolderList from './FolderList';
import NoteList from './NoteList';
import './dummy-store';
import './css/FolderView.css'

export default class FolderView extends Component {

  render() {
    console.log(this.props.addFolder)
    return (
      <div className='main-elements'>
        <FolderList addFolder={this.props.addFolder} selectedId={this.props.match.params.folderid}/>
        <NoteList selectedId={this.props.match.params.folderid} />
        <div className="folder-view"></div>
      </div>
    )
  }
}