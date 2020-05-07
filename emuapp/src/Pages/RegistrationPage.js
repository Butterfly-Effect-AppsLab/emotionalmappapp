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
import ButtonTemplate from '../Components/ButtonTemplate';
import Grid from '@material-ui/core/Grid'
import { GRAY, RED, TEXTGRAY, WHITE } from '../utils/colours';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    info: {
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        backgroundColor: RED,
        color: WHITE,
    },
    data: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
        backgroundColor: GRAY,
        flex: 1,
    },
    mainTitle: {
        fontSize: 28,
        paddingBottom: 10,
    },
    titles: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    mainText: {
        fontSize: 14,
    },
    text: {
        fontSize: 12,
    }
}));

const RegistrationPage = (props) => {
    const { years, sexes, streets } = props;
    const classes = useStyles();
    // const [valueComponent, setValueComponent] = React.useState('');
    const [regData, setRegData] = React.useState({
        // id: ,
        sex: '',
        // interests: [],
        residence_location: '',
        work_location: '',
        birthyear: ''
    });

    useEffect(() => {
        props.fetchRegInfo();
    }, []);

    useEffect(() => {
        console.log('regData', regData)
    }, [regData]);

    const getData = (value, idComponent) => {
        if (value) {
        setRegData({ ...regData, [idComponent]: value })
        };
    }


//podmienka na dostanie dat z backendu, zatial vyrenderovat dajaky loading indikator
if (years && sexes && streets)
    return (
        <div className={classes.main}>
            <div className={classes.info}>
                <Typography variant='h5' className={classes.mainTitle}>
                    Vaše údaje
                </Typography>
                <Typography variant='subtitle1' gutterBottom className={classes.mainText}>
                    Tieto informácie nám poslúžia na presnejšie oslovovanie v prieskumoch a anketách a nebudú nikde zverejnené.
                </Typography>
            </div>
            <div className={classes.data}>
                <Typography variant='h6' className={classes.titles}>
                    Rok narodenia
                </Typography>
                <Dropdown type={years} idComponent={'birthyear'} />

                <Typography variant='h6' className={classes.titles}>
                    Pohlavie
                </Typography>
                <Dropdown type={sexes} idComponent={'sex'} />

                <Typography variant='h6' className={classes.titles}>
                    Lokalita
                </Typography>
                <Typography variant='subtitle1' gutterBottom className={classes.text}>
                    Prosím, vyberte ulicu v Bratislave, na ktorej bývate. Na zákade toho vás správne priradíme k príslušnej mestskej časti.
                </Typography>
                <ComboBox type={streets} otherOption={[{ street: "Nebyvam v BA" }]} idComponent={'residance_location'} sendData={(value, idComponent) => {getData(value, idComponent)}}/>

                <Typography variant='subtitle1' gutterBottom className={classes.text}>
                    Prosím, vyberte ulicu v Bratislave, kde sa okrem bydliska nachádzate najčastejšie (kde pracujete, študujete...)
                </Typography>
                <ComboBox type={streets} otherOption={[{ street: "Nepracujem v BA" }]} idComponent={'work_location'} sendData={(value, idComponent) => {getData(value, idComponent)}}/>

                <Grid container justify='center'>
                    <ButtonTemplate background={WHITE} text={TEXTGRAY} />
                </Grid>
            </div>
        </div>
    )
else
    return null;
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
