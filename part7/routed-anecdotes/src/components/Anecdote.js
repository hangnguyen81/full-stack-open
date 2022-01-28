import React from "react";

const Anecdote = ({ anecdote }) =>{
    return (
        <div>
          <h2><strong>{anecdote.content}</strong></h2>
          <p>by <strong>{anecdote.author}</strong></p>
          <p>has {anecdote.votes} votes</p>
          <p>Click for more infor: <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
      )

};

export default Anecdote;