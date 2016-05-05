/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import classnames from 'classnames';

/**
 * Import Entities.
 */
import {getEntity, getEntities} from '../../store';

/**
 * Import Reactions.
 */
import {homepage_initialize, change_user} from './reactions';

/**
 * Import Components.
 */

/**
 * Import UX components.
 */

/**
 * Import styles.
 */
import styles from './styles';

/**
 * Import Internationalization.
 */
import {IntlProvider, FormattedMessage} from 'react-intl';

/**
 * The component.
 */
export default class extends React.Component {

  // Expected properties.
  static propTypes = {
    children: React.PropTypes.node,
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    routeParams: React.PropTypes.object.isRequired,
    routes: React.PropTypes.array.isRequired,
    state: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  };

  // Expected context properties.
  static contextTypes = {
    store: React.PropTypes.object
  };

  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  // At this point in the lifecycle, you can access any refs to your children
  // (e.g., to access the underlying DOM representation).
  // The componentDidMount() method of child components is invoked before that of parent components.
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
  // or send AJAX requests, perform those operations in this method.
  componentDidMount() {
    homepage_initialize();
  }

  // Invoked before rendering when new props or state are being received.
  // This method is not called for the initial render or when forceUpdate is used.
  // Use this as an opportunity to return false
  // when you're certain that the transition to the new props and state will not require a component update.
  // If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change.
  // In addition, componentWillUpdate and componentDidUpdate will not be called.
  shouldComponentUpdate(nextProps, nextState) {
    // This is not a pure component.
    // Basically the whole store's state is a prop which means
    // we always have to update the component when the store's state changes.
    return true;
  }

  // Render the component.
  render() {
    // Get the properties.
    const {state} = this.props;
    // Get the entities.
    var user = getEntity('User', state.app.home.userId);
    // Calculate the styles.
    const className = classnames(styles.root, {[`${styles.loading}`]: state.app.home.loading});
    // Return the component UI.
    return (
      <div className={className}>
        <span>{JSON.stringify(user, null, 2)}</span>
        <ul>
          {(() => {
            if (user && user.posts) {
              return getEntities('Post', user.posts).map((post)=>(
                <li key={post.id}>{JSON.stringify(post, null, 2)}</li>
              ));
            }
          })()}
        </ul>
        <div>
          <input type="text" value={state.app.home.userId}
                 onChange={(e) => change_user(e.target.value)}/>
          <label>User ID</label>
        </div>
      </div>
    );
  }
}
