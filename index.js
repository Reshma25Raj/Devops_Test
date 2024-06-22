const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const subjects = [
    {id: 1, name: 'Subject 1'},
    {id: 2, name: 'Subject 2'},
    {id: 3, name: 'Subject 3'}
];

// testing express
app.get('/',(req,res)=>{
    res.send('Hello World!');
});

// GET ALL
app.get('/api/subjects',(req,res)=> {
    res.send(subjects);
});

// GET BY ID
 
app.get('/api/subjects/:id',(req,res)=>{
    const subject = subjects.find(c=>c.id == parseInt((req.params.id)));
    if(!subject)
        return res.status(404).send(" The subject does not exists!");

        res.send(subject);
});

// POST
app.post('/api/subjects',(req,res)=>{
if(!req.body.name || req.body.name.length<3)
{
    return res.status(404).send(" The subject name is not valid!");
}

    const subject = {
        id:subjects.length+1,
        name: req.body.name
    }

    subjects.push(subject);
    res.send(subject);
});

// PUT
app.put('/api/subjects/:id', (req,res)=>{
    const subject = subjects.find(c=>c.id == parseInt((req.params.id)));
    if(!subject)
        return res.status(404).send(" The subject does not exists!");

    subject.name = req.body.name;
    res.send(subject);
});

// DELETE
app.delete('/api/subjects/:id',(req,res)=>{
    const subject = subjects.find(c=>c.id == parseInt((req.params.id)));
    if(!subject)
        return res.status(404).send(" The subject does not exists!");

    const index= subjects.indexOf(subject);
    subjects.splice(index,1);
    res.send(subject);

});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to port ${port}`));