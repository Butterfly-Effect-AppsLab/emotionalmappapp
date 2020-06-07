import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from '../Components/Dropdown';
import { fetchRegInfo, postRegInfo } from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getYears, getSexes, getStreets } from '../redux/selectors';
import ComboBox from '../Components/ComboBox';
import Typography from '@material-ui/core/Typography';
import ButtonTemplate from '../Components/ButtonTemplate';
import Grid from '@material-ui/core/Grid'
import { LIGHTGRAY, RED, DARKGRAY, WHITE } from '../utils/colours';
import Loading from '../Components/Loading';
import DatePicker from 'react-datepicker';

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
        backgroundColor: LIGHTGRAY,
        flex: 1,
    },
    mainTitle: {
        fontSize: 28,
        paddingBottom: 10,
        fontWeight: 500,
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
        color: DARKGRAY,
    }
}));

const RegistrationPage = (props) => {
    const { years, sexes, streets, fetchRegInfo, postRegInfo } = props;
    const classes = useStyles();
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [startDate, setStartDate] = React.useState(new Date());
    const [buttonStyle, setButtonStyle] = React.useState({
        textColor: '',
        background: '',
    });
    const [locationData, setLocationData] = React.useState({
        residence_location: null,
        work_location: null,
    });
    const [regData, setRegData] = React.useState({
        // id: ,
        sex: '',
        // interests: [],
        residence_location_id: null,
        work_location_id: null,
        birthyear: ''
    });

    useEffect(() => {
        fetchRegInfo();
    }, []);

    useEffect(() => {
        console.log('regData', regData)
        if (regData.sex != '' && regData.birthyear != '' && regData.residence_location_id != null && regData.work_location_id != null) {
            setIsDisabled(false);
            setButtonStyle({ ...buttonStyle, textColor: WHITE, background: RED })
        }
        else {
            setIsDisabled(true);
            setButtonStyle({ ...buttonStyle, textColor: DARKGRAY, background: WHITE })
        }
    }, [regData]);

    useEffect(() => {
        console.log('locationData', locationData)
        if (locationData.work_location && locationData.residence_location) {
            setRegData({ ...regData, work_location_id: locationData.work_location.id, residence_location_id: locationData.residence_location.id })
        }
        else if (locationData.work_location) {
           setRegData({ ...regData, work_location_id: locationData.work_location.id })
        }
        else if (locationData.residence_location) {
            setRegData({ ...regData, residence_location_id: locationData.residence_location.id })
        }
    }, [locationData]);



    const getData = (value, idComponent) => {
        if (value != 'undefined') {
            if (idComponent !== 'work_location' && idComponent !== 'residence_location') {
                console.log('som tu', idComponent)
                setRegData({ ...regData, [idComponent]: value })
            }
            else {
                console.log('value', value)
                setLocationData({ ...locationData, [idComponent]: value })
            };
        };
    };


    const onButtonClick = () => {
        postRegInfo(regData);
    };

    if (years && sexes && streets) {
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
                    <Dropdown type={years} idComponent={'birthyear'} sendData={(value, idComponent) => { getData(value, idComponent) }} />
                    {/* <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showYearPicker
                        dateFormat="yyyy"
                    /> */}
                    <Typography variant='h6' className={classes.titles}>
                        Pohlavie
                </Typography>
                    <Dropdown type={sexes} idComponent={'sex'} sendData={(value, idComponent) => { getData(value, idComponent) }} />

                    <Typography variant='h6' className={classes.titles}>
                        Lokalita
                </Typography>
                    <Typography variant='subtitle1' gutterBottom className={classes.text}>
                        Prosím, vyberte ulicu v Bratislave, na ktorej bývate. Na zákade toho vás správne priradíme k príslušnej mestskej časti.
                </Typography>
                    <ComboBox type={streets} otherOption={[{ street: "Nebývam v Bratislave" }]} idComponent={'residence_location'} sendData={(value, idComponent) => { getData(value, idComponent) }} />

                    <Typography variant='subtitle1' gutterBottom className={classes.text}>
                        Prosím, vyberte ulicu v Bratislave, kde sa okrem bydliska nachádzate najčastejšie (kde pracujete, študujete...)
                </Typography>
                    <ComboBox type={streets} otherOption={[{ street: "Mimo Bratislavy" }]} idComponent={'work_location'} sendData={(value, idComponent) => { getData(value, idComponent) }} />

                    <Grid container justify='center'>
                        <ButtonTemplate
                            variant="contained"
                            background={buttonStyle.background}
                            textColor={buttonStyle.textColor}
                            isDisabled={isDisabled}
                            text={'Odoslať'}
                            path={'/'}
                            onButtonClick={() => { onButtonClick() }} />
                    </Grid>
                </div>
            </div>
        )
    }
    else
        return <Loading />;
};


const mapStateToProps = (state) => {
    const years = getYears(state);
    const sexes = getSexes(state);
    const streets = getStreets(state);
    return { years, sexes, streets };
};

const mapDispatchToProps = (dispatch) => ({
    fetchRegInfo: bindActionCreators(fetchRegInfo, dispatch),
    postRegInfo: bindActionCreators(postRegInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
