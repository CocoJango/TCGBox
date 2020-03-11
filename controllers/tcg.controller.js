const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db/tcg.json');
const db = low(adapter);
db.defaults({tcg: [], count: 0})
    .write();

const slug = require('../helpers/apiInputModifier');
const responseHelper = require('../helpers/apiResponse');

exports.getAll = function (req, res) {
    const tcgs = db.get('tcg').find({});

    res.json(tcgs);
};

exports.create = async function (req, res) {

    const {name, url, status, level, username} = req.body;
    if (!valid(req.body))
        return responseHelper.validationErrorResponse(res, 'missing input', req.body);

    try {
        // check if TCG hasn't already been added
        const existing = await db.get('tcg').find({name}).value();

        if (existing) {
            return responseHelper.badRequestResponse(res, 'already existing', req.body);
        }

        db.get('tcg')
            .push({
                id: shortid.generate(),
                name,
                slug: slug.slugify(name),
                url,
                username,
                level,
                status,
                last_updated: new Date(),
                cards_count: 0
            })
            .write();

        const newTCG = db.get('tcg')
            .last()
            .value();

        // update TCG count
        db.update('count', n => n + 1)
            .write();

        responseHelper.createdResponse(res, 'added TCG', newTCG);

    } catch (err) {
        responseHelper.badRequestResponse(res, err, err);
    }

};

/**
 * Checks if all required fields are present in given JSON. 'name', 'url', 'status', 'level', 'username'.
 * @param {JSON} json - the request's body
 * @return boolean is valid
 */
function valid(json) {
    return json.hasOwnProperty('name')
        && json.hasOwnProperty('url')
        && json.hasOwnProperty('status')
        && json.hasOwnProperty('level')
        && json.hasOwnProperty('username');

}
