/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import store access.
 */
import {default as store, createReaction} from '../store';

/**
 * Collect all reactions.
 */
let exports = {};

/**
 * Toggle the locale.
 */
createReaction(exports, 'locale:toggle', () => {
  let state = store.get();
  state.set('locale', state.locale == 'en' ? 'de' : 'en');
});

/**
 * Export all reactions.
 */
module.exports = exports;
