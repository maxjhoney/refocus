/**
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * realTime/connectedRooms.js
 */
const ConnectedRooms = module.exports = {
  roomNames: new Set(),

  addRoom(nsp) {
    ConnectedRooms.roomNames.add(nsp);
  },

  removeRoom(nsp) {
    ConnectedRooms.roomNames.delete(nsp);
  },
};
