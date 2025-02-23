import express from 'express'
import 'dotenv/config';

const port=process.env.port || 3000

const app = express();

app.use(express.json())
let teaData=[]
let nextId=1;

// Add a new tea
app.post("/teas",(req,res)=>{
    const{name,price} = req.body;
    const newTea = {id:nextId++,name,price};
    teaData.push(newTea);
    res.status(201).send(newTea)

})
// Get all teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})
// Get a tea with id 
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    // params is used to acces from url
    if (!tea) {
        res.status(404).send('Tea not found');
        
    }
    res.status(200).send(tea)
})

// Update
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if (!tea) {
        res.status(404).send('Tea not found');
    }
    const {name,price} = req.body;
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea);
    
})
// delete
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send('Tea not found');
        
    }
    teaData.splice(index,1);
    res.status(204).send('deleted')
})


app.listen(port,()=>{
    console.log(`Server is listening at port ${port}....`)
})