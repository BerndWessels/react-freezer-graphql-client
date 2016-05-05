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
import {getEntity} from '../store';

/**
 * Import Reactions.
 */
import {locale_toggle} from './reactions';

/**
 * Import Components.
 */

/**
 * Import UX components.
 */
import {Link} from 'react-router';

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
    children: React.PropTypes.node.isRequired,
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
    store: React.PropTypes.object.isRequired
  };

  // Initialize the component.
  constructor(props) {
    super(props);
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
    const {children, state} = this.props;
    // Get the entities.
    var user = getEntity('User', state.app.home.userId);
    // Calculate the styles.
    const className = classnames(styles.root);
    // Return the component UI.
    return (
      <div className={className}>
        <Link to="/">Home</Link>
        <br/>
        <div onClick={() => locale_toggle('A debug message!', true)}>
          <FormattedMessage id="app.button"
                            description="A button in the application page."
                            defaultMessage="Button"/>
        </div>
        <h1>{user ? user.firstName : 'NOTHING TO SEE HERE'}</h1>
        {children}
      </div>
    );
  }
}
