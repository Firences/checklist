//import express
const express = require("express");

//import prisma client
const prisma = require("../prisma/client");

// Import validationResult from express-validator
const { validationResult } = require("express-validator");

//import bcrypt
const bcrypt = require("bcryptjs");
//function findUsers
const findUsers = async (req, res) => {
    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all users successfully",
            data: users,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const checklist = async (req, res) => {
    try {

        //get all users from database
        const checklist = await prisma.checklist.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all successfully",
            data: checklist,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const CreateNewChecklist = async (req, res) => {

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        //insert data
        const cklist = await prisma.checklist.create({
            data: {
                checklistid: Number(req.userId),
                name: req.body.name,
            },
        });
        //return response json
        res.status(201).send({
            success: true,
            message: "Register successfully",
            data: cklist,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const deleteChecklist = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {

        //delete user
        await prisma.checklist.delete({
            where: {
                id: Number(id),
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'Deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};
const checklistItem = async (req, res) => {
    try {
        //get ID from params
        const { id } = req.params;
        //get all users from database
        const cklist = await prisma.checklistitem.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                itemname: true,
                status: true,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all successfully",
            data: cklist,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const CreateNewchecklistItem = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        //insert data
        const cklist = await prisma.checklistitem.create({
            data: {
                itemid: Number(id),
                itemname: req.body.itemname,
                status: 'new',
            },
        });
        //return response json
        res.status(201).send({
            success: true,
            message: "Register successfully",
            data: cklist,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const getchecklistItembyid = async (req, res) => {
    try {
        //get ID from params
        const { id } = req.params;
        const { itemid } = req.params;

        //get all users from database
        const cklist = await prisma.checklistitem.findUnique({
            where: {
                id: Number(id),
                itemid: Number(itemid),
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all successfully",
            data: cklist,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const updatechecklistItembyid = async (req, res) => {

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        //get ID from params
        const { id } = req.params;
        const { itemid } = req.params;

        //get all users from database
        const cklist = await prisma.checklistitem.update({
            where: {
                id: Number(id),
                itemid: Number(itemid),
            },
            data: {
                status: req.body.status,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: "Get all successfully",
            data: cklist,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
const deletechecklistItembyid = async (req, res) => {

    //get ID from params
    const { id } = req.params;
    const { itemid } = req.params;

    try {

        //delete user
        await prisma.checklistitem.delete({
            where: {
                id: Number(id),
                itemid: Number(itemid),
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'Deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};
const renamechecklistItembyid = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {

        //update user
        const user = await prisma.checklistitem.update({
            where: {
                id: Number(id),
                itemid: Number(id),
            },
            data: {
                itemname: req.body.itemname,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};
module.exports = { findUsers,checklist,CreateNewChecklist,deleteChecklist,checklistItem,CreateNewchecklistItem,getchecklistItembyid,updatechecklistItembyid,deletechecklistItembyid,renamechecklistItembyid};