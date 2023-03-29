const express = require('express')
const cors = require('cors')
const app = express();

let PORT = 4000;


//require database models
const User = require('./models/users')
const List =require('./models/employee')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) //cross origin resource sharing.


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const dbURL = "mongodb://localhost:27017/Employees"
mongoose.connect(dbURL).then(() => {
    console.log("connected successfully to database");
})


  app.post('/create-employee',async(req,res)=>{
    let employeeData = new List({
        name:req.body.name,
        email:req.body.email,
        mobileNo:req.body.mobileNo,
        designation:req.body.designation,
        gender:req.body.gender,
        course:req.body.course,
        image:req.body.image,
        date:req.body.date
    })
    try {
        await employeeData.save()
        res.send({message:"Data added successfully"})
    } catch (err) {
         res.send({message:"Filed to add data"})
    }
  })

  //get the employee data from backend to front end
  app.get('/employees',async(req,res)=>{
       try {
        const list = await List.find()
        res.json(list)
       } catch (error) {
         console.log(error);
       }
  })

  app.get('/edit-employee/:id',async(req,res)=>{
    const{id} = req.params
    res,json(await List.findById(id))
  })
  app.put('/edit-employee/:id',async(req,res)=>{
    List.findByIdAndUpdate({_id:req.params.id})
    let employeeData = new List({
        name:req.body.name,
        email:req.body.email,
        mobileNo:req.body.mobileNo,
        designation:req.body.designation,
        gender:req.body.gender,
        course:req.body.course,
        image:req.body.image,
        date:req.body.date
    })
        try {
        await employeeData.save()
        res.send({message:"Data updated successfully"})
    } catch (err) {
         res.send({message:"Filed to update data"})
    }
  })
 


 

//login page
app.post('/login', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, userData) => {
        if (userData) {
            if (req.body.password == userData.password) {
                res.send({ message: 'login successfully' })
            } else {
                res.send({ message: 'login failed' })
            }
        } else {
            res.send({ message: 'no account seems to be matched with your email address' })
        }

    })
})

//fetching the data from front end to back end. for sign up page
app.post('/signup', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, userData) => {     //to find the user should not exist
        if (userData) {
            res.send({ message: "seems like you already have an account with this email" })
        } else {
            const data = new User({
                name: req.body.name,
                number: req.body.number,
                email: req.body.email,
                password: req.body.password
            })
            data.save(() => {
                if (err) {
                    response.send(err)
                } else {
                    res.send({ message: "You are registered successfully" })
                }
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
})