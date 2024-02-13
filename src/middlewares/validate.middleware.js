export const validateSchema = (schema) => async (req, response, next) => {
    try {
        await schema.parse(req.body)
        next()
    } catch (error) {
        if (Array.isArray(error.errors)) {
            return response.status(400).json(error.errors.map(e => e.message))
        }
        return response.status(400).json(error.message)
    }
}