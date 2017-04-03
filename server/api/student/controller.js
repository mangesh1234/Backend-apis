'use strict';
const restify = require('restify');
const logger = restify.getLogger('student');
exports.create = (req,res, next) => {
  res.send('good afternoon=====');
  console.log('hello');
};
const joi = require('joi');
const maindb = require('../../storage/main/models');
const boom = require('boom');

exports.create = {
  auth: false,
  validate: {
    payload: {
      email: joi.string().email().required().lowercase(),
      password: joi.string().required().min(8)
    }
  },
  handler: (req, res) => {
    req.log('ppppppp',req.payload);
    req.payload.createdBy = 'admin@brainbees.com';
    req.payload.updatedBy = 'admin@brainbees.com';
    const user = maindb.user
      .build(req.payload);
    user
      .encryptPassword(req.payload.password);
    return user
      .save()
      .then(() => {
        return res();
      })
      .catch((ex) => {
        return res(boom.expectationFailed(ex));
      });
  }
};

exports.changePassword = {
  validate: {
    payload: {
      password: joi.string().min(8).required()
    }
  },
  handler: (req, res) => {
    req.payload.updatedBy = req.auth.credentials.email;
    return maindb.user
      .findById(req.auth.credentials.id)
      .then((data) => {
        data.encryptPassword(req.payload.password);
        return data
          .save()
          .then(() => {
            return res();
          })
          .catch((e) => {
            return res(boom.expectationFailed(e));
          });
      });
  }
};

exports.mapRole = {
  validate: {
    params: {
      id: joi.number().required().positive()
    },
    payload: {
      roleId: joi.number().required().positive()
    }
  },
  handler: (req, res) => {
    const perm = req.server.methods.hasPermission(req.auth.credentials, 'user', 'modify');
    if (!perm) {
      req.log(['info', 'user'], req.auth.credentials.email + ' was denied access to map roles');
      return res(boom.forbidden('You do not have modify access!'));
    }
    return maindb
      .usersRole
      .create({
        userId: req.params.id,
        roleId: req.payload.roleId,
        createdBy: req.auth.credentials.email,
        updatedBy: req.auth.credentials.email
      })
      .then((rolemap) => {
        return res(rolemap);
      })
      .catch((e) => {
        return res(boom.expectationFailed(e));
      });
  }
};

exports.unmapRole = {
  validate: {
    params: {
      id: joi.number().required().positive(),
      roleId: joi.number().required().positive()
    }
  },
  handler: (req, res) => {
    const perm = req.server.methods.hasPermission(req.auth.credentials, 'user', 'delete');
    if (!perm) {
      req.log(['info', 'user'], req.auth.credentials.email + ' was denied access to delete roles');
      return res(boom.forbidden('You do not have delete access!'));
    }
    return maindb
      .usersRole
      .destroy({
        where: {
          userId: req.params.id,
          roleId: req.params.roleId
        }
      })
      .then((rolemap) => {
        return res(rolemap);
      })
      .catch((e) => {
        return res(boom.expectationFailed(e));
      });
  }
};

exports.getById = {
  validate: {
    params: {
      id: joi.number().required().positive()
    }
  },
  handler: (req, res) => {
    const perm = req.server.methods.hasPermission(req.auth.credentials, 'user', 'read');
    if (!perm) {
      req.log(['info', 'user'], req.auth.credentials.email + ' was denied access to view user detail of' +
        req.params.id);
      return res(boom.forbidden('You do not have read access!'));
    }
    return maindb
      .user
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id', 'email', 'dob', 'mobile', 'city', 'state', 'country', 'age', 'sex', 'isApproved', 'pincode','ClientMasterId', 'CompanyName'
        ],
        include: [{
          model: maindb.role,
          as: 'role',
          attributes: ['id', 'name', 'project'],
          include: [{
            model: maindb.project,
            as: 'projects',
            attributes: ['id', 'name', 'url', 'stakeholder']
          }]
        }]
      })
      .then((user) => {
        return res(user);
      })
      .catch((ex) => {
        return res(boom.expectationFailed(ex));
      });
  }
};

exports.fetchAll = {
  handler: (req, res) => {
    const perm = req.server.methods.hasPermission(req.auth.credentials, 'user', 'read');
    if (!perm) {
      req.log(['info', 'user'], req.auth.credentials.email + ' was denied access to list all users');
      return res(boom.forbidden('You do not have read access!'));
    }
    return maindb
      .user
      .findAll({
        attributes: [
          'id', 'email', 'ClientMasterId'
        ]
      })
      .then((users) => {
        return res(users);
      })
      .catch((e) => {
        return res(boom.expectationFailed(e));
      });
  }
};

exports.fetchRolesForProject = {
  validate: {
    params: {
      id: joi.number().required().positive(),
      projectId: joi.number().required().positive()
    }
  },
  handler: (req, res) => {
    const perm = req.server.methods.hasPermission(req.auth.credentials, 'user', 'read');
    if (!perm) {
      req.log(['info', 'user'], req.auth.credentials.email + ' was denied access to view user roles of' +
        req.params.id + ' for project ', req.params.projectId);
      return res(boom.forbidden('You do not have read access!'));
    }
    return maindb
      .role
      .findAll({
        attributes: ['id', 'name'],
        where: {
          project: req.params.projectId
        },
        include: [{
          model: maindb.usersRole,
          attributes: [],
          where: {
            userId: req.params.id
          }
        }]
      })
      .then((user) => {
        return res(user);
      })
      .catch((ex) => {
        req.log(['ERROR'], ex);
        return res(boom.expectationFailed(ex));
      });
  }
};

exports.updateUser = {
  validate: {
    params: {
      id: joi.number().positive().required()
    },
    payload: {
      ClientMasterId: joi.number().required()
//      CompanyName: joi.string().required()
    }
  },
  handler: (req, res) => {
    req.log('aaaaaaaaa',req.params);
    req.log('aaaaaaaaa',req.payload);
    const perm = req.server.methods.hasPermission(req.auth.credentials, 'project', 'create');
    if (!perm) {
      req.log(['info', 'project'], req.auth.credentials.email + ' was denied access to update a project role');
      return res(boom.forbidden('You do not have create access!'));
    }
    return maindb
      .user
      .update(req.payload, {
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        return res(user);
      })
      .catch((ex) => {
        return res(boom.expectationFailed(ex));
      });
  }
};