const express = require('express');
const NoteModel = require('../models/noteModel');
const noteRouter = new express.Router();

//create new Note
noteRouter.post('/note/create',async (req,res)=>{
    const note = new NoteModel(req.body);
    try {
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
}),

//read all notes
noteRouter.get('/note/read',async (req,res)=>{
    try {
        const notes = await NoteModel.find({});
        if (!notes) {
            res.status(404).send("No notes available,Create one");
        }
        res.send(notes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//update note by its id
noteRouter.patch('/note/update/:id',async (req,res)=>{
    const noteId = req.params.id;
    const allowedUpdates = ['note','title','liked']
    const updateByuser = Object.keys(req.body);
    const isValidOp = updateByuser.every(singleEl => allowedUpdates.includes(singleEl));

    if (!isValidOp) {
        res.status(400).send("Invalid updates")
    }

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(noteId,req.body,{new:true, runValidators:true});
        if (!updatedNote) {
            res.status(404).send("No note with given id")
        } 
        res.send(updatedNote)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//delete note by id
noteRouter.delete('/note/delete/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const deletedNote =await NoteModel.findByIdAndDelete(id);
        if (!deletedNote) {
            res.status(404).send("No note with such id")
        }
        res.send(deletedNote)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = noteRouter;