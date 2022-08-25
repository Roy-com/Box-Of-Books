const Joi = require("joi");
const validate = (user) => {
    const ValidationControl = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repassword:Joi.string().required(),
    });
  
    return ValidationControl.validate(user);
};
const validateLogin = (user) => {
    const ValidationControl = Joi.object({
       
        email: Joi.string().email().required(),
        password: Joi.string().required(),
       
    });
  
    return ValidationControl.validate(user);
};

const validateresetpassword = (user) => {
    const ValidationControl = Joi.object({
       
       
        newPassword: Joi.string().required(),
        confirmPassword: Joi.string().required(),
       
    });
  
    return ValidationControl.validate(user);
};
const validateResetPasswordemail = (user) => {
    const ValidationControl = Joi.object({
       
        email: Joi.string().email().required(),
       
    });
  
    return ValidationControl.validate(user);
};
module.exports = {  validate, validateLogin, validateresetpassword ,validateResetPasswordemail};