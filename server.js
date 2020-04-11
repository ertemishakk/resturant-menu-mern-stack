const express = require('express')
const validateForm = require('./validateForm')
const keys = require('./config/keys')
const sgMail = require('@sendgrid/mail');
const stripe = require('stripe')(keys.stripe_secret_key)
const cors = require('cors')
const { v4: uuid } = require('uuid');

const app = express()
// app.use(cors)

app.use(express.json({ extended: false }))




app.post('/validateForm', (req, res) => {
    const { errors, isValid } = validateForm(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
})

app.post('/checkout', (req, res) => {
    const { fields, token } = req.body
    const idempotencyKey = uuid()

    stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: fields.cartTotal * 100, // cents
            currency: 'AUD',
            customer: customer.id,
            receipt_email: token.email,
            // description: product.name,
            // shipping: {
            //     name: token.card.name,
            //     address: {
            //         country: token.card.address_country
            //     }
            // }
        }, { idempotencyKey })
    })
        .then(() => {
            sgMail.setApiKey(keys.sendGridAPI)

            const msg = {
                to: token.email,
                from: 'ertemishakk@gmail.com',
                subject: 'Your order is being processed.',
                text: `We've receieved your order. We will let you know when it's on its way.`
            }

            sgMail.send(msg)

            res.json({ success: 'Success' })
        })
        .catch(err => console.log(err))


})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})