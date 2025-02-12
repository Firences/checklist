//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

// Definisikan validasi untuk register
const validateRegister = [
    body('username')
    .notEmpty().withMessage('Username is required')
    .custom(async (value) => {
        if (!value) {
            throw new Error('Username is required');
        }
        const user = await prisma.user.findUnique({ where: { username: value } });
        if (user) {
            throw new Error('Username already exists');
        }
        return true;
    }),
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if (!value) {
                throw new Error('Email is required');
            }
            const user = await prisma.user.findUnique({ where: { email: value } });
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
];

//definisikan validasi untuk login
const validateLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
];

module.exports = { validateRegister, validateLogin };