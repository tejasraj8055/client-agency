import Client from '../models/client.js';
import Agency from '../models/agency.js';
import CreateError from 'http-errors';

export const create = async (req, res, next) => {
  try {
    const aName = req.body.aName;
    const agency = await Agency.findOne({ aName });
    if (agency) {
      req.body.agency = agency._id;
    } else {
      const agency = await Agency.create(req.body);
      req.body.agency = agency._id;
    }
    const result = await Client.create(req.body);
    res.send({ sucess: true, result });
  } catch (error) {
    console.log(error);
    next(new CreateError(404, error.message));
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const result = await Client.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    if(!result){
        res.status(404).json({"success":"false"})
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    next(new CreateError(404, error.message));
  }
};

export const max = async (req, res, next) => {
  try {
    const result = await Client.find()
      .sort({ totalBill: -1 })
      .limit(1)
      .select({ agency: 1, cName: 1, totalBill: 1 })
      .populate({
        path: 'agency',
        select: 'aName cName totalBill',
      });
    res.send({ success: true, result });
  } catch (error) {
    console.log(error);
    next(new CreateError(404, error.message));
  }
};
