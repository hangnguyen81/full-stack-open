import React from "react";
import Button from './Button';
import { createAnecdote } from "../reducers/anecdotesReducer";
import { setMessage } from "../reducers/notificationReducer";
import { connect } from 'react-redux';
//import { useDispatch } from "react-redux";

const NewAnecdote = (props) => {
    //const dispatch = useDispatch();
    
    const addAnecdote = (event) => {
        event.preventDefault();
        const anecdoteContent = event.target.anecdote.value;
        event.target.anecdote.value = '';       
        props.createAnecdote(anecdoteContent);
        props.setMessage(`You just created: ${anecdoteContent}`,5);
    };
    return(
        <>
        <h2>new anecdote</h2>
        <form onSubmit={addAnecdote}>
            <div><input className="anecdote-input" name='anecdote'/></div>
            <Button text='Create'/>
        </form>
        </>
    );
};

const mapDispatchToProps = {
    createAnecdote,
    setMessage
}

//export default NewAnecdote;
const ConnectedNewAnecdote = connect(null,mapDispatchToProps)(NewAnecdote);  
export default ConnectedNewAnecdote;