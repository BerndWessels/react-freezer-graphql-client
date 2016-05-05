/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2016 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {useRouterHistory, Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

/**
 * Import Internationalization.
 */
import {IntlProvider, addLocaleData} from 'react-intl';
import intlDE from 'react-intl/locale-data/de';
import intlEN from 'react-intl/locale-data/en';
import intlMessagesDE from '../public/assets/translations/de.json';
import intlMessagesEN from '../public/assets/translations/en.json';

/**
 * Import Store.
 */
import store from './store';

/**
 * Import Routes.
 */
import routes from './routes';

/**
 * Import styles.
 */
import styles from './styles';

/**
 * Create the routing history.
 */
const browserHistory = useRouterHistory(createBrowserHistory)({basename: '/'});

/**
 * Add internationalization for supported languages.
 */
// Add all language data for the supported locales.
addLocaleData(intlDE);
addLocaleData(intlEN);

// Convenience function to get the messages for a given locale.
function intlMessages(locale) {
  switch (locale) {
    case 'de':
      return intlMessagesDE;
    case 'en':
      return intlMessagesEN;
    default:
      return intlMessagesEN;
  }
}

/**
 * The entry component of the application.
 */
class Index extends React.Component {
  // Initialize the component.
  constructor(props) {
    super(props);
  }

  // Declare the properties this component expects.
  static defaultProps = {};

  // Declare the context properties this component exposes.
  static childContextTypes = {
    store: React.PropTypes.object
  };

  // Set the context property values this component exposes.
  getChildContext() {
    return {
      store: store
    };
  }

  // Invoked once, both on the client and server, immediately before the initial rendering occurs.
  // If you call setState within this method,
  // render() will see the updated state and will be executed only once despite the state change.
  componentWillMount() {
  }

  // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
  // At this point in the lifecycle, you can access any refs to your children
  // (e.g., to access the underlying DOM representation).
  // The componentDidMount() method of child components is invoked before that of parent components.
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
  // or send AJAX requests, perform those operations in this method.
  componentDidMount() {
    // Render the application whenever the window size changes.
    window.addEventListener('resize', () => {
      this.forceUpdate();
    });
    // Render the application whenever the store has been updated.
    store.on('update', () => {
      this.forceUpdate();
    });
  }

  // Invoked when a component is receiving new props. This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called
  // by updating the state using this.setState(). The old props can be accessed via this.props.
  // Calling this.setState() within this function will not trigger an additional render.
  componentWillReceiveProps(nextProps) {
  }

  // Invoked before rendering when new props or state are being received.
  // This method is not called for the initial render or when forceUpdate is used.
  // Use this as an opportunity to return false
  // when you're certain that the transition to the new props and state will not require a component update.
  // If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change.
  // In addition, componentWillUpdate and componentDidUpdate will not be called.
  shouldComponentUpdate(nextProps, nextState) {
    // This is the root container which propagates all updates and renders the whole application.
    return true;
  }

  // Invoked immediately before rendering when new props or state are being received.
  // This method is not called for the initial render.
  // Use this as an opportunity to perform preparation before an update occurs.
  // You cannot use this.setState() in this method.
  // If you need to update state in response to a prop change, use componentWillReceiveProps instead.
  componentWillUpdate(nextProps, nextState) {
  }

  // Invoked immediately after the component's updates are flushed to the DOM.
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  componentDidUpdate(prevProps, prevState) {
  }

  // Invoked immediately before a component is unmounted from the DOM.
  // Perform any necessary cleanup in this method,
  // such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
  componentWillUnmount() {
  }

  // Pass additional properties to the route components.
  createElement(Component, props) {
    return <Component {...props} store={store} state={store.get()}/>;
  }

  // Render the component.
  render() {
    // Get the application state.
    const state = store.get();
    // Return the component UI.
    return (
      <IntlProvider locale={state.locale} messages={intlMessages(state.locale)}>
        <Router history={browserHistory} routes={routes} createElement={this.createElement}/>
      </IntlProvider>
    );
  }
}

/**
 * (Re-)Render the application.
 */
function render() {
  // Set the index styles.
  document.getElementById('index').className = styles.root;
  // Render the application.
  ReactDOM.render(
    <Index/>,
    document.getElementById('index')
  );
}

/**
 * Start the application.
 */
render();
