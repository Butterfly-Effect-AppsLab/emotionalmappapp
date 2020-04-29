import React, { useEffect } from 'react';
import Dropdown from '../Components/Dropdown';
import { fetchRegInfo } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { getYears } from '../redux/selectors';
import { getSexes } from '../redux/selectors';
import { getStreets } from '../redux/selectors';
import ComboBox from '../Components/ComboBox';

const RegistrationPage = (props) => {
    const { years, sexes, streets } = props;
    
    useEffect(() => {
        props.fetchRegInfo();
    }, [])


    return (
        <div>
            <center><h1>Registration</h1></center>
            <Dropdown type={sexes}/>
            <Dropdown type={years}/>
            <ComboBox type={streets}/>
            <ComboBox type={streets}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    const years = getYears(state);
    const sexes = getSexes(state);
    const streets = getStreets(state);
    return { years, sexes, streets };
};
  
  const mapDispatchToProps = (dispatch) => ({
    fetchRegInfo: bindActionCreators(fetchRegInfo, dispatch),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
  