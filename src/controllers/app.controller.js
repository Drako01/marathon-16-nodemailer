import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    let message = {
        from: 'Alejandro Di Stefano <alejandro@gmail.com>',
        to: 'alexmarinmendez@gmail.com',
        subject: 'Nuevo usuario registrado',
        html: '<h1>Nuevo usuario!</h1>'
    }

    try {
        const info = await transporter.sendMail(message)
        res.status(201).json({ 
            message: 'Email enviado..',
            preview: nodemailer.getTestMessageUrl(info)
        })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

export const getbill = async (req, res) => {
    const emailUser = req.body.email
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    }
    let transporter = nodemailer.createTransport(config)
    let message = {
        from: process.env.GMAIL_USER,
        to: emailUser,
        subject: 'Compra realizada',
        html: '<h1>gracias por tu compra!</h1>'
    }

    try {
        const info = await transporter.sendMail(message)
        res.status(201).json({ 
            message: 'Email enviado..'
        })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}