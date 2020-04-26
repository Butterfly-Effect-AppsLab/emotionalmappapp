import React from 'react';
import { Link } from 'react-router-dom';
import TestApp from '../Components/TestApp';
import { fetchYears } from '../redux/actions';
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
                    console.log('load from BE');
                    props.fetchYears();
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
  fetchYears: bindActionCreators(fetchYears, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);
