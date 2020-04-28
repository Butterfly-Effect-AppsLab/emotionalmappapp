import React, { useEffect } from 'react';
import Dropdown from '../Components/Dropdown';
import { fetchRegInfo } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import ComboBox from '../Components/ComboBox';

const RegistrationPage = (props) => {
    
    useEffect(() => {
        props.fetchRegInfo();
    }, [])


    return (
        <div>
            <center><h1>Registration</h1></center>
            <Dropdown type={'sexes'}/>
            <Dropdown type={'years'}/>
            {/* <ComboBox /> */}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {};
  };
  
  const mapDispatchToProps = (dispatch) => ({
    fetchRegInfo: bindActionCreators(fetchRegInfo, dispatch),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
  