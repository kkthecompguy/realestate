import React from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Alert extends React.Component {
  componentDidUpdate(prevProps) {
    const { error, messages, alert } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
    }

    if (messages !== prevProps.messages) {
      if (messages.loginSuccess) alert.success(messages.loginSuccess);
      if (messages.logoutSuccess) alert.success(messages.logoutSuccess);
      if (messages.loginFail) alert.error(messages.loginFail);
      if (messages.passwordNotmatch) alert.error(messages.passwordNotmatch);
      if (messages.messageSent) alert.success(messages.messageSent);
      if (messages.notSent) alert.error(messages.notSent);
    }
  }
  render() {
    return (
      <React.Fragment></React.Fragment>
    );
  }
}

Alert.propTypes = {
  error: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  error: state.errors,
  messages: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alert));