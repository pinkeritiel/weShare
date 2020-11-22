var mongoose = require('mongoose');
var Member = require('../member.model');
 
exports.register = function (req, res) {
    console.log("registering: " + req.body.name);
    Member.register(new Member({
        username: req.body.username,
        name: req.body.name
        email: req.body.email,
        cellphone: req.body.cellphone,
        gender: req.body.gender
    }), req.body.password, function (err, member) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            res.send({
                success: true,
                member: member
            });
        }
    });
};

exports.login = function (req, res, next) {
 
    Member.authenticate()(req.body.username, req.body.password, function (err, member, options) {
        if (err) return next(err);
        if (member === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(member, function (err) {
                res.send({
                    success: true,
                    member: member
                });
            });
        }
    });
 
};
 
exports.getLogin = function (req, res) {
    console.log(req.member);
    if (req.member) {
 
        return res.send({
            success: true,
            member: req.member
        });
 
    } //res.send(500, {status:500, message: 'internal error', type:'internal'}); == deprecated
 
 
    res.send({
        success: false,
        message: 'not authorized'
    });
};