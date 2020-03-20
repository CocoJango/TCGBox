const validator = require('express-validator');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/user.json');
const db = low(adapter);
db.defaults({})
    .write();

exports.create = function (req, res, next) {

    // Extract the validation errors from a request.
    const errors = validator.validationResult(req);

    const {name, email, password, password_repeat} = req.body;
    const user = {name, email};

    if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        return res.render('setup/setup', {title: 'Welcome to TCGBox', user: user, errors: errors.array()});
    } else {

        const {name, email, password} = req.body;

        db.get('user')
            .push({
                id: shortid.generate(),
                name,
                email,
                password
            })
            .last()
            .write()
            .then(newUser => res.render('setup/first_tcg', {title: 'Add your first TCG!', newUser}));
    }
};
