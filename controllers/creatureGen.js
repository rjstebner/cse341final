const { body, validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllCreatureGen = async (req, res) => {
    try {
        const result = await mongodb.getDB().collection('creatureGen').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getCreatureGenById = async (req, res) => {
    try {
        const creatureGenId = new ObjectId(req.params.id);
        const result = await mongodb.getDB().collection('creatureGen').findOne({ _id: creatureGenId });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'creatureGen not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createCreatureGen = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newcreatureGen = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        };

        try {
            const result = await mongodb.getDB().collection('creatureGen').insertOne(newcreatureGen);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
];

const deleteCreatureGpe = async (req, res) => {
    try {
        const CreatureSpeId = new ObjectId(req.params.id);
        const results = await mongodb.getDB().collection('creatureGen').deleteOne({ _id: CreatureSpeId });
        if (results.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json({ error: 'Failed to delete CreatureSpe' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateCreatureGen = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const CreatureSpeId = new ObjectId(req.params.id);
        const updatedCreatureSpe = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        };
        try {
            const results = await mongodb.getDB().collection('creatureGen').updateOne({ _id: CreatureSpeId }, { $set: updatedCreatureSpe });
            if (results.modifiedCount > 0) {
                res.status(200).send();
            } else {
                res.status(500).json({ error: 'Failed to update CreatureSpe' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
];

module.exports = {
    getAllCreatureGen,
    getCreatureGenById,
    createCreatureGen,
    deleteCreatureGpe,
    updateCreatureGen
};