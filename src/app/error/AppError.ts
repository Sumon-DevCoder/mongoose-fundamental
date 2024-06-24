class AppError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = "") {
    console.log("app err msg", message);
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
