const registerModels = require('../models/registerModels');
const nodemailer = require('nodemailer');
const bcrty = require('bcrypt');
const cookie = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const imagespath = path.join('ulplodesImg')
const index = (req, res) => {
    if (res.locals.user) {
        return res.redirect('/dashbord')
    }
    res.render('index')
}
const register = (req, res) => {
    res.render('register')
}
const dashbord = (req, res) => {
    res.render('dashbord')
}
const loginData = (req, res) => {
    res.redirect('/dashbord')
}
const registerData = async (req, res) => {
    try {
        const {body:{name,email,password}}=req
        let userlogin = await registerModels.findOne({email:email})
        if(userlogin){
            console.log("Record is allrediy aexit");
            res.redirect('back')
            return
        }
        if (req.body.password == req.body.cpassword) {
            const register = await registerModels.create({
                name,email,password
            });
            if (register) {
                console.log("Record is Add !");
               return res.redirect('/')
            } else {
                res.redirect('back')
            }
        }
        else {
            console.log("Passwpord and Cpassword is not valid !");
        }
    } catch (error) {
        console.log(error);
        return
    }
}
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return
        }
        return res.redirect('/');
    })
}
const forgetpassword = (req, res) => {
    res.render('for-get-password')
}
const otp = (req, res) => {
    if (req.cookies.obj) {
        return res.render('otp')
    }
    return res.redirect('/forgetpassword')
}
const newpassword = (req, res) => {
    if (req.cookies.otpData) {
        return res.render('newpassword')
    }
    res.redirect('/otp')
}
const sendEmail = async (req, res) => {
    try {
        let otp = Math.floor(Math.random() * 1000000);
        let email = req.body.email;
        let obj = { email, otp }
        console.log(req.body);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: '8352itishanaliyadra@gmail.com',
                pass: 'rqjpzhjdpniwvgvg'
            }
        });
        const mailOptions = {
            from: '8352itishanaliyadra@gmail.com',
            to: email,
            subject: 'prima Inforom',
            html: `<p>otp:-${otp}</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                res.cookie('obj', obj)
                console.log('Email sent:', info.response);
                return res.redirect('/otp')
            }
        });
    } catch (error) {
        console.log(error);
        return
    }
}
const otpData = async (req, res) => {
    try {
        if (req.cookies.obj.otp == req.body.otp) {
            res.cookie('otpData', req.body.otp)
            return res.redirect('/newpassword')
        }
        return res.redirect('/otp')
    } catch (error) {
        console.log(error);
        return
    }
}
const newpassworData = async (req, res) => {
    let email = req.cookies.obj.email;
    try {
        if (req.body.password == req.body.cpassword) {
            let user = await registerModels.findOneAndUpdate({ email }, { password: req.body.password });
            if (user) {
                res.clearCookie('obj')
                res.clearCookie('otpData')
                return res.redirect('/')
            } else {
                console.log("Record is not fach");
                return
            }

        } else {
            console.log("Record is not fach");
            return
        }
    } catch (error) {
        console.log(error);
        return
    }
}
const profaile = (req, res) => {
    res.render('profaile')
}
const profailepotoData = async (req, res) => {
    try {
        let id = res.locals.user.id;
        if (req.file) {
            let images = `${imagespath}/${req.file.filename}`;
            const uplodes = await registerModels.findByIdAndUpdate(id, Object.assign({ images }, req.body))
            if (uplodes) {
                if (uplodes.images !== 'ulplodesImg/userImages.png') {
                    fs.unlinkSync(uplodes.images)
                }
            }
            return res.redirect('/dashbord')

        } else {
            const oldImages = res.locals.user.images;
            const uplodes = await registerModels.findByIdAndUpdate(id, Object.assign({ oldImages }, req.body))
            if (uplodes) {
                return res.redirect('dashbord');
            }

        }

    } catch (error) {
        console.log(error);
        return
    }


}


module.exports = { index, dashbord, loginData, register, registerData, logout, profaile, forgetpassword, sendEmail, otp, otpData, newpassword, newpassworData, profailepotoData }