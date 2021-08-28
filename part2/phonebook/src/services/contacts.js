import axios from "axios";

const baseUrl = 'http://localhost:3001/contacts'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newObj =>{
    const request = axios.post(baseUrl,newObj)
    return request.then(res => res.data)
}

const deleteContact = id =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id,newContact) =>{
    const request = axios.put(`${baseUrl}/${id}`,newContact)
    return request.then(res =>res.data)

}
// eslint-disable-next-line
export default {getAll, create, deleteContact, updateContact}