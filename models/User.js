const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { model, Schema } = mongoose


const userSchema = new Schema({
    username: String,
    name: String,
    password: String, //hash password
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
}, {
    timestamps: true
}
)

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    try {
        this.password = await bcrypt.hash(this.password, 10)

    } catch (error) {
        next(error)
    }

})

userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

module.exports = model('User', userSchema)