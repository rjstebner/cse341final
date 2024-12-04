const { body, validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllItems = async (req, res) => {
    try {
        const result = await mongodb.getDB().collection('Items').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getItemById = async (req, res) => {
    try {
        const ItemId = new ObjectId(req.params.id);
        const result = await mongodb.getDB().collection('Items').findOne({ _id: ItemId });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createItem = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newItem = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        };
        try {
            const results = await mongodb.getDB().collection('Items').insertOne(newItem);
            if (results.acknowledged) {
                res.status(200).send();
            } else {
                res.status(500).json({ error: 'Failed to create Item' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
];

const updateItem = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const ItemId = new ObjectId(req.params.id);
        const updatedItem = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        };
        try {
            const results = await mongodb.getDB().collection('Items').updateOne({ _id: ItemId }, { $set: updatedItem });
            if (results.modifiedCount > 0) {
                res.status(200).send();
            } else {
                res.status(500).json({ error: 'Failed to update Item' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
];

const deleteItem = async (req, res) => {
    try {
        const ItemId = new ObjectId(req.params.id);
        const results = await mongodb.getDB().collection('Items').deleteOne({ _id: ItemId });
        if (results.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json({ error: 'Failed to delete Item' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };