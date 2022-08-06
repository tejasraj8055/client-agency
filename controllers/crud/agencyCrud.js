import Agency from '../../models/agency.js'
import createHttpError from 'http-errors'

// @desc Get all Agencies
// @route GET/agency
// @access Private
export const getAllAgencies = async(req,res,next)=>{
    try {
        const agencies = await Agency.find()
        if(!agencies){
            next(new createHttpError(404, "Agencies not found" ));
        }
        res.status(200).json({"count":agencies.length, agencies})
    } catch (error) {
        next(new createHttpError(404, error.message ));
    }
}

// @desc Get individual Agency
// @route GET/agency/:id
// @access Private
export const getIndividualAgency = async(req,res,next)=>{
    try {
        const agency = await Agency.findById(req.params.id)

        if(!agency){
            next(new createHttpError(404, "Agency not found" ));
        }
        res.status(200).json(agency)
    } catch (error) {
        next(new createHttpError(404, error.message ));
    }
}

// @desc Create Agency
// @route POST/agency/:id
// @access Private
export const createAgency = async(req,res,next)=>{
    try {
        const agency = await Agency.create(req.body)
        res.status(200).json(agency)
    } catch (error) {
        next(new createHttpError(404, error.message ));
    }
}

// @desc Update Agency
// @route PUT/agency/:id
// @access Private
export const updateAgency = async(req,res,next)=>{
    try {
        const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!agency){
            res.status(404).json({"success":"false"})
        }
        res.status(200).json(agency)
    } catch (error) {
        next(new createHttpError(404, error.message ));
    }
}

// @desc Delete Agency
// @route DELETE/agency/:id
// @access Private
export const deleteAgency = async(req,res,next)=>{
    try {
        const agency = await Agency.findByIdAndDelete(req.params.id)
        if(!agency){
            res.status(404).json({"success":"false"})
        }
        res.status(204).json(agency)
    } catch (error) {
        next(new createHttpError(404, error.message ));
    }
}