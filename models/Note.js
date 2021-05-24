const mongoose = require('mongoose')

const { model, Schema } = mongoose

const noteSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    important: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

noteSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = model('Note', noteSchema)
