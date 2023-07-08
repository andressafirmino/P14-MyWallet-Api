export function validateSchema(schema) {
    return (req, res, next) => {
        const validateSignUp = schema.validate(req.body, { abortEarly: false });
        if (validateSignUp.error) {
            const errors = validateSignUp.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }
        next();
    }
}