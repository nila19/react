import { connect } from 'react-redux';

import Visibility from './visibility';
import { ACTION } from '../reducer';

const changeVisibility = (visibility) => {
  return {
    type: ACTION.CHANGE_VISIBILITY,
    visibility,
  };
};

const mapStateToProps = (state) => {
  return {
    visibility: state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeVisibility: (id) => {
      dispatch(changeVisibility(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Visibility);
