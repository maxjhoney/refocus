/**
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

'use strict';
const TBL = 'BotData';

module.exports = {
  up: function (qi, Sequelize) {
    let attr;
    return qi.describeTable(TBL)
    .then((attributes) => {
      attr = attributes;
      if (!attr.hasOwnProperty('jsonValue')) {
        return qi.addColumn(TBL, 'jsonValue', {
          type: Sequelize.JSON,
          allowNull: true,
        });
      }

      return true;
    });
  },

  down: function (qi, Sequelize) {
    let attr;
    return qi.describeTable(TBL)
    .then((attributes) => {
      attr = attributes;
      if (attr.hasOwnProperty('jsonValue')) {
        return qi.removeColumn(TBL, 'jsonValue');
      }

      return true;
    });
  },
};
