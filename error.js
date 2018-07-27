class newError extends Error{
  constructor(code, message){
    this.code = code;
    this.message = message;
  }
}

module.exports = newError;