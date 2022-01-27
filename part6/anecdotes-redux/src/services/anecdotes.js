/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async() =>{
    const response = await axios.get(baseUrl);
    return response.data
};

const getOne = async(id) =>{
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}
const createNew = async(content) =>{
    const contentObj = {
        content,
        votes: 0,
        id: getId()
    }
    const response = await axios.post(baseUrl, contentObj);
    return response.data;
};

const updateVote = async(id, newObj) =>{
    const response = await axios.put(`${baseUrl}/${id}`, newObj);
    return response.data;
};

const removeAnecdote = async(id) =>{
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data
};

export default { getAll, createNew, removeAnecdote, updateVote, getOne };