import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from '../Components/Dropdown';
import { fetchRegInfo } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getYears } from '../redux/selectors';
import { getSexes } from '../redux/selectors';
import { getStreets } from '../redux/selectors';
import ComboBox from '../Components/ComboBox';
import Typography from '@material-ui/core/Typography';
import { GRAY } from  '../utils/colours';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    info: {
        padding: theme.spacing(2),
    },
    data: {
        padding: theme.spacing(2),
        backgroundColor: GRAY,
        flex: 1,
    },
    titles: {
        fontWeight: 'bold',
    }
}));

const RegistrationPage = (props) => {
    const { years, sexes, streets } = props;
    const classes = useStyles();

    useEffect(() => {
        props.fetchRegInfo();
    }, [])


    return (
        <div className = {classes.main}>
            <div className = {classes.info}>
                <Typography variant='h5' className = {classes.titles}>
                    Vaše údaje
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                    Tieto informácie nám poslúžia na presnejšie oslovovanie v prieskumoch a anketách a nebudú nikde zverejnené.
                </Typography>
            </div>
            <div className = {classes.data}>
                <Typography variant='h6' className = {classes.titles}>
                    Rok narodenia
                </Typography>
                <Dropdown type={years} />

                <Typography variant='h6' className = {classes.titles}>
                    Pohlavie
                </Typography>
                <Dropdown type={sexes} />

                <Typography variant='h6' className = {classes.titles}>
                    Primárna lokalita
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                    Prosím, vyberte ulicu v Bratislave, kde bývate
                </Typography>
                <ComboBox type={streets} />

                <Typography variant='h6' className = {classes.titles}>
                    Sekundárna lokalita
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                    Prosím, vyberte ulicu v Bratislave, kde sa okrem bydliska nachádzate najčastejšie (kde pracujete, študujete...)                </Typography>
                <ComboBox type={streets} />
            </div>
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
