import React from 'react';


export default class AddFolder extends React.Component {
    state = {
        name: ""
    }

    handleSubmit= (e) =>{
        e.preventDefault();
        this.props.addFolder(this.state.name);
    }

    handleChange= (e) => {
        console.log(e);
    this.setState({name: e})
    } 


    render() {
        return (
            <form className= 'add-folder' onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor='folder-name'> Folder Name:</label>
                <input type='text' onChange={e => this.handleChange(e.target.value)} name='folder-name' id='folder-name'/>
                <button type='submit'>Add</button>
            </form>
        )
    }
}
