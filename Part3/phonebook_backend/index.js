const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


const errorHandler = (error, req, res, next) => {
    console.error(error.message)  
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}  
app.use(requestLogger)

//fetching the whole list of phonebook entries
app.get('/api/contacts', (req, res) =>{
    Contact
        .find({})
        .then(contacts => {
            res.json(contacts)         
        })
})

//fetching a single entry of phonebook
app.get('/api/contacts/:id',(req,res, next)=>{
    Contact.findById(req.params.id)
        .then(contact =>{
            if (contact){
                res.json(contact)
            }
            else{
                res.status(404).end('No contact found')
            }
        })
        .catch(error =>next(error))
})

app.delete('/api/contacts/:id',(req, res, next) =>{
    Contact.findByIdAndRemove(req.params.id)
        .then (() =>{
            res.status(204).end()
        })
        .catch(error => next(error))  
})

app.put('/api/contacts/:id',(req, res, next) =>{
    const body = req.body
    const contact = {
        firstName: body.firstName,
        lastName: body.lastName,
        number: body.number
    }
    Contact.findByIdAndUpdate(req.params.id, contact, {new: true})
        .then(updatedContact => res.json(updatedContact))
        .catch (error => next(error))
})

app.post('/api/contacts',(req, res, next) =>{   
    const body = req.body

    const contact = new Contact({
        firstName: body.firstName,
        lastName: body.lastName,
        number: body.number
    })

    contact
        .save()
        .then(savedContact =>savedContact.toJSON())
        .then(savedAndFormattedContact => {
            res.json(savedAndFormattedContact)
        }) 
        .catch(error => next(error))
    res.redirect('/api/contacts')
})

app.get('/info',(req,res) =>{
    Contact
        .find({})
        .then(result =>{
            let total = result.length
            res.send(`This phonebook has info of ${total} people `).end()
        })

})
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


//https://vast-atoll-41721.herokuapp.com/ | https://git.heroku.com/vast-atoll-41721.git