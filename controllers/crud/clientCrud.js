import Client from '../../models/client.js';
import createHttpError from 'http-errors';

// @desc Get all Clients
// @route GET/client
// @access Private
export const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    if (!clients) {
      next(new createHttpError(404, 'Clients not found'));
    }
    res.status(200).json({ count: clients.length, clients });
  } catch (error) {
    next(new createHttpError(404, error.message));
  }
};

// @desc Get individual Client
// @route GET/client/:id
// @access Private
export const getIndividualClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      next(new createHttpError(404, 'Client not found'));
    }
    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    next(new createHttpError(404, error.message));
  }
};

// @desc Create Client
// @route POST/client/:id
// @access Private
export const createClient = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(200).json(client);
  } catch (error) {
    console.log(error)
    if (error.code === 11000)
      next(new createHttpError(400, 'duplicate client'));
    next(new createHttpError(404, error.message));
  }
};

// @desc Update Client
// @route PUT/client/:id
// @access Private
export const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
        next(new createHttpError(404, 'No client found'));
    }
    res.status(200).json(client);
  } catch (error) {
    console.log(error)
    next(new createHttpError(404, error.message));
  }
};

// @desc Delete Client
// @route DELETE/client/:id
// @access Private
export const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      res.status(404).json({ success: 'false' });
    }
    res.status(400).json(client);
  } catch (error) {
    next(new createHttpError(404, error.message));
  }
};
