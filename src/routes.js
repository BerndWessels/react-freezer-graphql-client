/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {IndexRoute, Route} from 'react-router';

/**
 * Import Features.
 */
import App from './app';
import Home from './app/home';

/**
 * The application's routing structure.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
);
