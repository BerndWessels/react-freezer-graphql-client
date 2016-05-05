/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import store and entity cache functionality.
 */
import {default as store, createReaction, setEntity, fetchQuery} from '../../store';

/**
 * Import query fragments.
 */
import query from './query';

/**
 * Collect all reactions.
 */
let exports = {};

/**
 * Load initial homepage data.
 */
createReaction(exports, 'homepage:initialize', () => {
  const state = store.get();
  if (state.app.home.isInitialized) {
    return;
  }
  state.app.home.set('loading', true);
  fetchQuery(query()).then((queryValue) => {
    const state = store.get();
    let home = state.app.home.transact();
    home.loading = false;
    home.isInitialized = true;
    home.viewer = queryValue.viewer;
    state.app.home.run();
  });
});

/**
 * Change user.
 */
createReaction(exports, 'change:user', (id) => {
  const state = store.get();
  let home = state.app.home.transact();
  home.userId = id;
  home.loading = true;
  state.app.home.run();
  fetchQuery(query()).then((queryValue) => {
    const state = store.get();
    let home = state.app.home.transact();
    home.loading = false;
    home.viewer = queryValue.viewer;
    state.app.home.run();
  });
});

/**
 * Export all reactions.
 */
module.exports = exports;
