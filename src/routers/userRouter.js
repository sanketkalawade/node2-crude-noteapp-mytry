const express = require('express');
const userRouter = new express.Router();
const UserModel = require('../models/userModel');

//create new user
userRouter.post('/user/create', async (req,res)=>{
    const user = new UserModel(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }     
})

//read all users
userRouter.get('/user/read',async (req,res)=>{
    try {
        const users = await UserModel.find({});
        if (!users) {
            res.status(404).send("No users in db")
        }
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//update user by its id
userRouter.patch('/user/update/:id', async (req,res)=>{
    const _id = req.params.id;
    const allowedUpdates = ["password","email","age","name"];
    const updatesByUser = Object.keys(req.body);
    const isOpSuccess = updatesByUser.every(singleEl => allowedUpdates.includes(singleEl));
    if (!isOpSuccess) {
        return res.status(400).send("Invalid updates")
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(_id, req.body, {new:true, runValidators:true});
        if (!updatedUser) {
            res.status(404).send("No user with such id");
        }    
        res.send(updatedUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//delete user by its id
userRouter.delete('/user/delete/:id', async (req,res)=>{
     const _id = req.params.id;
     try {
         const deletedUser = await UserModel.findByIdAndDelete(_id);
         if (!deletedUser) {
             res.status(404).send("No user with given id to delete")
         }
         res.send(deletedUser);
     } catch (error) {
         res.status(500).send(error.message)
     }
})



module.exports = userRouter;