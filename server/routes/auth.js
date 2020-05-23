const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, SENDGRID_KEY} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
 auth:{
  api_key: SENDGRID_KEY
 }
}))
router.get('/protected',requireLogin, (req, res)=>{
  res.send('hello user')
})

router.post('/signup', (req, res) => {
 const { name, email, password, pic } = req.body
 if (!email || !password || !name) {
  return res.status(422).json({ error: 'Please add all the fields' })
 }
 User.findOne({ email: email })
  .then((savedUser) => {
   if (savedUser) {
    return res.status(422).json({ error: 'User already exists with that email' })
   }
   bcrypt.hash(password, 12).then(hashedPassword => {
    const user = new User({
     email,
     password:hashedPassword,
     name,
     pic
    })
    user.save().then(user => {
     transporter.sendMail({
      to:user.email,
      from:'zgranda@gmail.com',
      subject:'Signup succes',
      html:'<h1>Welcome to Instaclone</h1>'
     }).then(data=>console.log(data))
     res.json({ message: 'saved successfully' })
    }).catch(err => {
     console.log(err);
    })

  })
 }).catch(err => {
  console.log(err);
 })
})

router.post('/signin', (req, res)=>{
 const {email, password} = req.body
 if (!email || !password) {
  return res.status(422).json({error:"Please provide email and password"})
 }
 User.findOne({email:email})
 .then(savedUser=>{
  if (!savedUser) {
   return res.status(422).json({error:"Invalid email or password"})
  }
  bcrypt.compare(password,savedUser.password)
  .then(doMatch=>{
   if (doMatch) {
    const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
    const {_id, name, email, followers, following, pic}= savedUser
    res.json({token:token, user:{_id, name, email, followers, following, pic}})
   }else {
    return res.status(422).json({error:"Invalid email or password"})
   }
  }).catch(err=>{
   console.log(err);
  })
 })
})

module.exports = router