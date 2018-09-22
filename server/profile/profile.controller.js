const Profile = require('./profile.model');
const User = require('../user/user.model');

/**
 * Load profile and append to req.
 */
function load(req, res, next, id) {
    Profile.get(id)
        .then((profile) => {
            req.profile = profile; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Load profile by userid and append to req.
 */
function loadByUserId(req, res, id) {
    Profile.findOne({ 'user.userid': id })
        .then((profile) => {
            res.json(profile); // eslint-disable-line no-param-reassign
        });
}

/**
 * Get profile
 * @returns {Profile}
 */
function get(req, res) {
    return res.json(req.profile);
}

/**
 * Create new profile
 * @property {string} req.body.userid - The userid of user.
 * @property {string} req.body.fullname - The fullname of user.
 * @property {string} req.body.email - The email of user.
 * @returns {Profile}
 */
function create(req, res, next) {
    const profile = new Profile({
        userid: req.body.userid,
        fullname: req.body.fullname,
        email: req.body.email
    });

    profile.save()
        .then(savedProfile => res.json(savedProfile))
        .catch(e => next(e));
}

/**
 * Update existing profile
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
    const profile = req.profile;
    profile.fullname = req.body.fullname;
    profile.email = req.body.email;
    profile.photo = req.body.photo;
    profile.residence = req.body.residence;
    profile.portfolio = req.body.portfolio;
    profile.education = req.body.education;
    profile.personality = req.body.personality;
    profile.work_experience = req.body.work_experience;
    profile.other_experience = req.body.other_experience; 
    
    profile.save()
        .then(savedProfile => res.json(savedProfile))
        .catch(e => next(e));
}

/**
 * Delete profile.
 * @returns {Profile}
 */
function remove(req, res, next) {
    const profile = req.profile;
    profile.remove()
        .then(deletedProfile => res.json(deletedProfile))
        .catch(e => next(e));
}

/**
 * Find user by email 
 * @return {User}
 */
function findUserByEmail(req, res, next) {
    const email = req.body.email;

    console.log(email);

    User.findOne({ 'email': email }, 'email', function (error, result) {
        if (error) next(error);
        res.json(result);
    });
}


module.exports = { load, loadByUserId, get, create, update, remove, findUserByEmail };
