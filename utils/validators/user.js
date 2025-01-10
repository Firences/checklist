//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

// Definisikan validasi untuk create user
const validateUser = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .custom(async (value, { req }) => {
            if (!value) {
                throw new Error('username is required');
            }
            const user = await prisma.user.findUnique({ where: { username: value } });
            if (user && user.id !== Number(req.params.id)) {
                throw new Error('Username already exists');
            }
            return true;
        }),
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value, { req }) => {
            if (!value) {
                throw new Error('Email is required');
            }
            const user = await prisma.user.findUnique({ where: { email: value } });
            if (user && user.id !== Number(req.params.id)) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
];

module.exports = { validateUser }
