const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
//app.use(morgan('tiny'));

morgan.token('content', (req,res) =>{
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const port = 3001;
app.listen(port,()=>{
    console.log('Server is running on port ' + port);
});

app.get('/',(req,res)=>{
    res.send('Phonebook backend');
})

//fetching the whole list of phonebook entries
app.get('/api/persons', (req, res) =>{
    res.json(persons);
})

//fetching a single entry of phonebook
app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id)
    if (person){
        res.json(person);
    }
    else{
        res.status(404).end('No person found');
    }

})

app.delete('/api/persons/:id',(req,res) =>{
    const id = Number(req.params.id);
    persons = persons.filter(person => persons.id !== id);
    res.status(204).end();
})

app.post('/api/persons',(req, res) =>{    
    const person = req.body;

    if (!person.name){
        return res.status(400).json({err: 'name is missing'});
    } else {
        const isExistingPerson = persons.find(p => p.name === person.name)
        if (isExistingPerson){
            return res.status(409).json({err: 'name must be unique'});
        }
    }

    if (!person.number){
        return res.status(400).json({err: 'number is missing'});
    }

    const id = Math.floor(Math.random()*100);

    const newPerson = {
        id: id,
        name: person.name,
        number: person.number
    };

    persons = persons.concat(newPerson);
    res.json(persons);
})

//display overall infor of phonebook
app.get('/info',(req,res)=>{
    const totalPersons = persons.length;
    const requestTime = new Date();
    res.send(
        `<p>Phonebook has infor for ${totalPersons} persons </p>
            <p>${requestTime}</p>
        `);

})