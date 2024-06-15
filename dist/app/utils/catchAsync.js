"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// catchAsync is try catch ar alternative and it work higher order function
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;
