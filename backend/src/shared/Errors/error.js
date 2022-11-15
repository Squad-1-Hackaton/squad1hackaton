class ErrorApp {
    constructor(message, statusCode = 400, errorCode){
        this.message = message,
        this.statusCode = statusCode
        if(errorCode){
            this.errorCode = errorCode
        }
    }
}

module.exports = ErrorApp