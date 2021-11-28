const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req, res, next) => {
    err.statusCode = err.statusCode || 500;
    //err.message = err.message || 'Internal Server Error';
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage: err.message,
            error  :err.stack
        })
    }
    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.message = err.message;

    // wrong mongoose object ID Error
    if(err.name === 'CastError'){
        const message = `Resources not fount. Invalid: ${err.path}`
        error = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Validation ErrorHandler
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400)
    }




        res.status(error.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
    }

   