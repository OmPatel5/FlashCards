const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const mongoose = require('mongoose');
const TopicModel = require('./models/Topics')
const QuizzesModel = require('./models/Quizzes')

const cors = require('cors');
const CardsModel = require('./models/Cards');
const UserModel = require('./models/Users');
app.use(cors());
app.use(express.json())

require("dotenv").config();



app.post('/sendEmail', (req, res) => {
    function sendMail() {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "flamango.mango000@gmail.com",
                pass: "cccjmzskvvrbofrj"
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    
    
        let details = {
            from: "flamango.mango000@gmail.com",
            to: req.body.email,
            subject: "Flash Cards Team", 
            text: "Your 6 Digit Verification Code is " + req.body.verification_code
        }
    
        mailTransporter.sendMail(details, (err)=>{
            if (err) {
                res.send(err)
            }
            else {
                res.send('email has been sent!')
            }
        })
    }
    
    sendMail();
})


mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);

app.get("/getTopics", (req, res) => {
    TopicModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createTopic", async (req, res) => {
    const topic = req.body;
    const newTopic = new TopicModel(topic);
    await newTopic.save();

    res.json(topic)
})


// QUIZZES

app.get("/getQuizzes", (req, res) => {
    QuizzesModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createQuiz", async (req, res) => {
    const quiz = req.body;
    console.log(quiz)
    const newQuiz = new QuizzesModel(quiz);
    await newQuiz.save();

    res.json(quiz)
})



app.put("/updateQuizIds", async (req, res) => {
    const id = req.body.id;
    const _id = req.body._id;

    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    console.log(req.body)

    try {
        TopicModel.findById(_id, (err, updatedQuizIds) => {
            console.log(updatedQuizIds)

            if (err) {
                console.log(err);
            } else {
                updatedQuizIds.quizIds.push(id); 
                updatedQuizIds.save();
                res.send('updated successfully');
            }
        })
    } catch(err) {
        console.log(err)
    }
})

// CARDS
app.get("/getCards", (req, res) => {
    CardsModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createCard", async (req, res) => {
    const card = req.body;
    console.log(card)
    const newCard = new CardsModel(card);
    await newCard.save();

    res.json(card)
})




// Users
app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.send('successfully added user')
})

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    })
})



app.listen(3001, () => {
    console.log('Server is Running')
});

