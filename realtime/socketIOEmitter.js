/**
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * ./realtime/socketIOEmitter.js
 */
'use strict'; // eslint-disable-line strict
const rtUtils = require('./utils');
const connectedRooms = require('./connectedRooms');
const initPerspectiveEvent =
  'refocus.internal.realtime.perspective.namespace.initialize';
const initBotEvent = 'refocus.internal.realtime.bot.namespace.initialize';

module.exports = (io, key, obj, pubOpts) => {
  // newObjectAsString contains { key: {new: obj }}
  const newObjectAsString = rtUtils.getNewObjAsString(key, obj);

  // Initialize namespace when perspective initialize namespace event is sent
  if (key.startsWith(initPerspectiveEvent)) {
    rtUtils.initializePerspectiveNamespace(obj, io);
  }

  if (key.startsWith(initBotEvent)) {
    rtUtils.initializeBotNamespace(obj, io);
  }

  connectedRooms.roomNames.forEach((roomName) => {
    /* Check the perspective/room filters before emitting. */
    if (rtUtils.shouldIEmitThisObj(roomName, obj, pubOpts)) {
      io.of('perspectives').to(roomName).emit(key, newObjectAsString);
    }
  });
};
