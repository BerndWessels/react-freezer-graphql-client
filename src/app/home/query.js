/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import the store.
 */
import store from '../../store';

/**
 * Import the child component's query fragments.
 */
//import
var UserPanelQueryFragment = () => {
  return `id firstName posts { id title user { id lastName } }`;
};

/**
 * Export the component's GraphQL query fragment.
 */
export default () => {
  const state = store.get();
  return `user(id: ${state.app.home.userId}) {
    ${UserPanelQueryFragment()}
  }`;
}
