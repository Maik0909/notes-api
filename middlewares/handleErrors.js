module.exports = (error, req, res, _) => {

    const { name, message } = error

    console.warn('ERROR:', name, message)

    switch (name) {
        case 'CastError':
            res.status(400).json({ error: 'id is malformed' })
            break
        case 'JsonWebTokenError':
            res.status(400).json({ error: message })
        case 'TokenExpiresError':
            res.status(401).json({ error: message })
        default:
            res.status(500).end()
            break

    }
}