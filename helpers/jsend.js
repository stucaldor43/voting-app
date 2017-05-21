module.exports = {
    success(data) {
        return JSON.stringify(Object.assign({}, {status: "success", data}));
    },
    fail(data) {
        return JSON.stringify(Object.assign({}, {status: "fail", data}));
    },
    error(err) {
        return JSON.stringify(Object.assign({}, {status: "error", message: err.message}));
    },
}