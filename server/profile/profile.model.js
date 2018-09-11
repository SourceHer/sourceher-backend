const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Profile Schema
 */
const ProfileSchema = new mongoose.Schema({
  userid: {
    type: ObjectId, 
    ref: 'User',
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    require: true
  },
  photo: {
      data: {
          type: Buffer,
          required: false
      },
      contentType: {
          type: String, 
          required: false
      }
  },
  residence: {
    type: String, 
    required: false
  },
  portfolio: {
      type: String, 
      required: false
  }, 
  education: [
    {
        school: {
            type: String, 
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldOfStudy: {
            type: String, 
            required: true
        },
        from: {
            type: Date, 
            required: true
        },
        to: {
            type: Date,
            required: false
        },
        location: {
            type: String, 
            required: true
        }
    }
  ],
  work_experience: [{
      company: {
          type: String, 
          required: true
      },
      title: {
          type: String,
          required: true
      },
      from: {
          type: Date, 
          required: true
      },
      to: {
          type: Date,
          required: false
      },
      location: {
          type: String,
          required: true
      }
  }],
  other_experience: {
      type: String, 
      required: false
  },
  personality: [
      {
          quality: {
              type: String,
              required: true
          },
          value: {
              type: String, 
              required: true
          }
      }
  ]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ProfileSchema.method({
});

/**
 * Statics
 */
ProfileSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of profile.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((profile) => {
        if (profile) {
          return profile;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Profile', ProfileSchema);
