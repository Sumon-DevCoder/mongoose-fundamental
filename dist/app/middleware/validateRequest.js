"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationRequest = (schema) => {
    return async (req, res, next) => {
        try {
            // validation check
            await schema.parseAsync({
                body: req.body,
            });
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = validationRequest;
