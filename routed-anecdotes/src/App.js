import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import Footer from './components/Footer';
import CreateNew from './components/CreateNew';
import Anecdote from "./components/Anecdote";

const App = () => {
  const initialAnecdotes = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [notification, setNotification] = useState(null)

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  const history = useHistory();
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    Notify(`A new anecdote: ${anecdote.content} created`,3000);
    history.push('/');
  }

  const Notify = (text, timeout) =>{
    setNotification(text);
    setTimeout(()=>{
      setNotification(null);
    },timeout);
  }
  /*
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  */
  return (
    <div>
      <h1>Software anecdotes</h1>
        <Menu />
        {notification ? notification : null}
        <Switch>
          <Route exact path='/'><AnecdoteList anecdotes={anecdotes} /></Route>
          <Route path='/anecdotes/:id'><Anecdote anecdote={anecdote}/></Route>
          <Route path='/create'><CreateNew addNew={addNew} /></Route>
          <Route path='/about'><About /></Route>
        </Switch>      
        <Footer />
    </div>
  )
}

export default App;