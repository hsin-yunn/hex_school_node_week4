const express = require('express');
const router = express.Router();
const User = require('../models/user');
const responseHelper = require('../helpers/responseHelper');

//store
router.post('/', async function (req, res, next) {
  try {
    const postData = req.body;
    //name check
    if (!postData.name) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else if (!postData.email) {
      responseHelper.errorHandler(res, 400, 'email is required');
    } else {
      const user = await User.create(postData);
      res.status(201).json({
        data: user,
      });
    }
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'data format is not correct');
  }
});

module.exports = router;
