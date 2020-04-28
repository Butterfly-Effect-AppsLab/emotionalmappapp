import React from 'react';
import { connect } from 'react-redux';
import { getYears } from '../redux/selectors';

function TestApp(props) {
    const { years } = props.years;


    return (
        <div>
            {years.map((year, index) => (
                <p key={index}>{year}</p>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => {
    const years = getYears(state);
    return { years };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestApp);
