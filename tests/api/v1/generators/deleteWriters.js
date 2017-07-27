/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * tests/api/v1/generators/deleteWriters.js
 */
'use strict';

const supertest = require('supertest');
const api = supertest(require('../../../../index').app);
const constants = require('../../../../api/v1/constants');
const tu = require('../../../testUtils');
const u = require('./utils');
const expect = require('chai').expect;
const Generator = tu.db.Generator;
const User = tu.db.User;
const writersPath = '/v1/generators/{key}/writers';
const writerPath = '/v1/generators/{key}/writers/{userNameOrId}';
const generatorPath = '/v1/generators/{key}';

describe('api: generatorss: permissions', () => {
  let token;
  let otherValidToken;
  let generator;
  let user;
  const generatorToCreate = u.getGenerator();

  beforeEach((done) => {
    tu.createToken()
    .then((returnedToken) => {
      token = returnedToken;
      done();
    })
    .catch((err) => done(err));
  });

  beforeEach((done) => {
    Generator.create(generatorToCreate)
    .then((gen) => {
      generator = gen;
    }).then(() =>

      /**
       * tu.createToken creates an user and an admin user is already created,
       * so one use of these.
       */
      User.findOne({ where: { name: tu.userName } }))
    .then((usr) => generator.addWriter(usr))
    .then(() => tu.createSecondUser())
    .then((secUsr) => {
      generator.addWriter(secUsr);
      user = secUsr;
    })
    .then(() => tu.createThirdUser())
    .then((tUsr) => tu.createTokenFromUserName(tUsr.name))
    .then((tkn) => {
      otherValidToken = tkn;
    })
    .then(() => done())
    .catch((err) => done(err));
  });

  afterEach(u.forceDelete);
  afterEach(tu.forceDeleteUser);

  describe('delete resource without permission', () => {
    it('return 403 when deleting generator without permission', (done) => {
      api.delete(generatorPath.replace('{key}', generator.id))
      .set('Authorization', otherValidToken)
      .expect(constants.httpStatus.FORBIDDEN)
      .end((err /* , res */) => {
        if (err) {
          done(err);
        }

        done();
      });
    });
  });

  describe('delete writer(s)', () => {
    it('remove write permission using username', (done) => {
      api.delete(writerPath.replace('{key}', generator.id)
        .replace('{userNameOrId}', user.name))
      .set('Authorization', token)
      .expect(constants.httpStatus.NO_CONTENT)
      .end((err /* , res */) => {
        if (err) {
          return done(err);
        }

        api.get(writersPath.replace('{key}', generator.id))
      .set('Authorization', token)
      .expect(constants.httpStatus.OK)
      .expect((res) => {
        expect(res.body).to.have.length(1);
      })
      .end((_err /* , res */) => {
        if (_err) {
          return done(_err);
        }

        return done();
      });
        return null;
      });
    });

    it('remove write permission using user id', (done) => {
      api.delete(writerPath.replace('{key}', generator.id)
        .replace('{userNameOrId}', user.id))
      .set('Authorization', token)
      .expect(constants.httpStatus.NO_CONTENT)
      .end((err /* , res */) => {
        if (err) {
          return done(err);
        }

        api.get(writersPath.replace('{key}', generator.id))
      .set('Authorization', token)
      .expect(constants.httpStatus.OK)
      .expect((res) => {
        expect(res.body).to.have.length(1);
      })
      .end((_err /* , res */) => {
        if (_err) {
          return done(_err);
        }

        return done();
      });
        return null;
      });
    });

    it('Write permissions should not be effected for invalid user', (done) => {
      api.delete(writerPath.replace('{key}', generator.id)
        .replace('{userNameOrId}', 'invalidUserName'))
      .set('Authorization', token)
      .expect(constants.httpStatus.NOT_FOUND)
      .end((err /* , res */) => {
        if (err) {
          return done(err);
        }

        api.get(writersPath.replace('{key}', generator.id))
      .set('Authorization', token)
      .expect(constants.httpStatus.OK)
      .expect((res) => {
        expect(res.body).to.have.length(2);
      })
      .end((_err /* , res */) => {
        if (_err) {
          return done(_err);
        }

        return done();
      });
        return null;
      });
    });

    it('return 403 when deleteting a writer using a token ' +
      'generated for a user not already in the list of writers', (done) => {
      api.delete(writerPath.replace('{key}', generator.id)
        .replace('{userNameOrId}', 'invalidUserName'))
      .set('Authorization', otherValidToken)
      .expect(constants.httpStatus.FORBIDDEN)
      .end((err /* , res */) => {
        if (err) {
          done(err);
        }

        done();
      });
    });
  });
});