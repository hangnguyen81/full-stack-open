import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Button from "./Button";
import { vote, deleteAnecdote } from "../reducers/anecdotesReducer";
import { setMessage } from '../reducers/notificationReducer';

const Anecdote = ({anecdote, handleVote, handleDelete}) => {
    return (
        <div className="anecdote-card" key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div className="anecdote-sub">
            has {anecdote.votes}
            <Button onClick={handleVote} text='Vote'/>
            <Button onClick={handleDelete} text='Delete'/>
          </div>
        </div>
    )
}

const compareVotes = (a,b) =>{
    return b.votes - a.votes
}

const Anecdotes = () => {
    const filter = useSelector(state => state.filter).toLowerCase();
    const anecdotes = useSelector(state => {
        if (filter === '')
            return state.anecdotes;
        else
            return state.anecdotes.filter(item => item.content.toLowerCase().includes(filter));
    });
    anecdotes.sort(compareVotes);
    const dispatch = useDispatch();
    return (
        <>
            {anecdotes.map((anecdote, index) =>
                <Anecdote 
                    key={index}
                    anecdote={anecdote}    
                    handleVote={() => {
                        dispatch(vote(anecdote.id));
                        dispatch(setMessage(`You voted: ${anecdote.content}`,5));
                    }}
                    handleDelete={() => {
                        dispatch(deleteAnecdote(anecdote.id));
                        dispatch(setMessage(`You deleted: ${anecdote.content}`,5));
                    }} 
                />
            )}      
        </>
    )
}

export default Anecdotes;