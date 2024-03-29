const Joi = require('joi');

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email() ,
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,32}$')) 
        });

        const {error} = schema.validate(req.body);
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lowercase, uppercase, numbers
                        <br>
                        2. It must be at least 8 characters in length
                        <br>
                        3. It must NOT be the same as the email address
                        <br>
                        4. It must NOT be a commonly used password`
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    });
            }
        } else {
            next();
        }
        }
}