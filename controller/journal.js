
const Jobs = require('../models/job')

const getJournals = async (req, res) => {
    try {
        const jobs = await Jobs.find({createdby: req.user.userId})
        res.status(200).json({noOfJobs: jobs.length, jobs})
        
    } catch (error) {
        console.log(error)
        res.json({error})
        
    }
}

const getJournal = async (req, res) => {
const{journalId} = req.params
    try {
    const jobs = await Jobs.findOne({createdby: req.user.userId, _Id: journalId})
    if (!jobs) {
        return res.status(404).json({success: false, message: 'Job not found'})
    }
    res.status(200).json({jobs})

} catch (error) {
    console.log(error)
        res.json({error})
    
}
}

const createJournal = async (req, res) => {
    // company, position, createdby
    const { company, position } = req.body
    req.body.createdby = req.user.userId
    console.log(req.body);
    console.log(req.user);
    if(!company || !position) {
        return res.status(400).json({
            success: false,
            message: 'please provide neccesary information',
        })
    }
    try {
        const job = await Jobs.create(req.body)
        res.status(201).json({ success: true, job})
        
    } catch (error) {
        console.log(error)
        res.json({error})
        
    }
}

const updateJournal = async (req, res) => {
    const {journalId} = req.params
    const {company, position} = req.body
    try {
        const jobs = await Jobs.findOneAndUpdate({createdby: req.user.userId, _Id: journalId}, req.body, {new:true, runValidators: true,})

        res.status(200).json({jobs})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

const deleteJournal = async (req, res) => {
    const {journalId} = req.params
    try {
        const jobs = await Jobs.findOneAndDelete({createdby: req.user.userId, _Id: journalId})
        if(!jobs){
        res.status(404).json({message: 'Job not found'})
        }
        res.status(200).json({message: 'Job deleted successfully'})
    } catch (error) {
        console.log(error)
        res.json({error})
        
    }
}

module.exports = { getJournal, getJournals, createJournal, deleteJournal, updateJournal,}