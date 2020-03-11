/**
 * Sends a Response. If data is given it will be appended.
 * @param {Response} res
 * @param {String} msg
 * @param {Object} data
 * @param {Number} status
 * @returns {Response}
 */
const success = (res, msg, data, status) => {
    const output = {
        status: status,
        message: msg
    };
    if(data)
        output.data = data;
    return res.status(status).json(output);
};

/**
 * Sends a Response. If error is given it will be appended.
 * @param {Response} res
 * @param {String} msg
 * @param {Object} error - Error data
 * @param {Number} status
 * @returns {Response}
 */
const error = (res, msg, error, status) => {
    const output = {
        status: status,
        message: msg
    };
    if(error)
        output.error = error;
    return res.status(status).json(output);
};

/**
 * Sends a 200 OK with data.
 * @param {Response} res
 * @param {String} msg
 * @param {Object} data
 */
exports.successResponse = function (res, msg, data) {
    success(res, msg, data, 200);
};

/** Sends a 201 Created with data.
 * @param {Response} res
 * @param {String} msg
 * @param {Object} model
 */
exports.createdResponse = function (res, msg, model) {
    success(res, msg, model, 201);
};

/**
 * Sends a 200 OK with data.
 * @param {Response} res
 * @param {String} msg
 */
exports.deletedResponse = function (res, msg, data) {
    success(res, msg, data, 200);
};

/**
 * Sends a 404 Not Found.
 * @param {Response} res
 * @param {String} msg
 */
exports.notFoundResponse = function (res, msg) {
    error(res, msg, null, 404);
};

/**
 * Sends a 422 Error with data.
 * @param res
 * @param msg
 * @param data
 */
exports.validationErrorResponse = function (res, msg, data) {
    error(res, msg, data, 422);
};

/**
 * Sends a 401 Unauthorized.
 * @param {Response} res
 * @param {String} msg
 */
exports.unauthorizedResponse = function (res, msg) {
    error(res, msg, null, 401);
};

/**
 * Sends a 408 Request Timeout.
 * @param {Response} res
 * @param {String} msg
 */
exports.timeoutResponse = function (res, msg) {
    error(res, msg, null, 408);
};

/**
 * Sends a 405 Not Allowed.
 * @param {Response} res
 * @param {String} msg
 */
exports.notAllowedResponse = function (res, msg) {
    error(res, msg, null, 405);
};

/**
 * Sends a 400 Bad Request Error with data.
 * @param {Response} res
 * @param {String} msg
 * @param {Object} data
 */
exports.badRequestResponse = function (res, msg, data) {
    error(res, msg, data, 400);
};
