const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const profileCtrl = require('./profile.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/profiles - Create Profile */
  .post(profileCtrl.create)

router.route('/:profileId')
  /** GET /api/profiles/:profileId - Get profile */
  .get(profileCtrl.get)

  /** PUT /api/profiles/:profileId - Update Profile */
  .put(validate(paramValidation.profile), profileCtrl.update)

  /** DELETE /api/profiles/:profileId - Delete Profile */
  .delete(profileCtrl.remove);

router.route('/user/:userId')
  /** GET /api/profiles/:profileId - Get profile */
  .get(profileCtrl.loadByUserId)

/** Load user when API with profileid route parameter is hit */
router.param('profileId', profileCtrl.load);

module.exports = router;


