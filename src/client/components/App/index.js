import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';

const App = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
