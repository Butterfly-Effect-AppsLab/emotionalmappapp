import React from 'react';
import { Link } from 'react-router-dom';
import TestApp from '../Components/TestApp';
import { fetchRegInfo } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

function ReduxTest(props) {
  return (
    <div style={{ height: '500px' }}>
      <Link to='/'>GO TO NEWS</Link>
      Redux Test Page
      <TestApp />
      <button
                onClick={() => {
                    props.fetchRegInfo();
                }}
            >
                LOAD FROM BE
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  fetchRegInfo: bindActionCreators(fetchRegInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);
