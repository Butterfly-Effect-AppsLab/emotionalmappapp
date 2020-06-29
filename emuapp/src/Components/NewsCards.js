import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as SourceIcon } from '../icons/source.svg';
import PlaceholderImage from '../icons/news_placeholder_image.png';
import { DARKGRAY } from '../utils/colours';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 10,
        borderRadius: 20,
    },
    title: {
        marginBottom: 5,
        textAlign: 'left',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        marginLeft: 5,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    iconDiv: {
        width: 30,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: '1vw'
    },
    date: {
        color: DARKGRAY,
        textAlign: 'left',
        marginBottom: 10,
    },
    media: {
        marginTop: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    image: {
        maxHeight: '30vh',
        maxWidth: '90vw',
        borderRadius: 10,
    }
});

const NewsCards = (props) => {
    const { news } = props
    const classes = useStyles();


    const renderCard = (news, i) => {
        console.log(news.image)
        return (
            <div key={i}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.date} variant="body2" component="p">
                            {moment(news.pub_date).format('DD.MM.YYYY')}
                        </Typography>
                        <Typography className={classes.title} style={{ fontWeight: 'bold' }} variant="h5" component="h2">
                            <Link href={news.link} color='inherit'>
                                {news.title.split(/\s+/).length < 15 ? news.title : news.title.split(/\s+/).slice(0, 10).join(" ") + "..."}
                            </Link>
                        </Typography>
                        <div className={classes.row}>
                            <div className={classes.iconDiv}>
                                <SourceIcon />
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.text} variant="body2" component="p">
                                    {news.rss_feed.name ? news.rss_feed.name : "Unknown"}
                                </Typography>
                            </div>
                        </div>
                        
                            <CardMedia className={classes.media}>
                                <Link href={news.link} color='inherit'>
                                {news.image !== '' ?
                                    <img src={news.image} className={classes.image}/>
                                    :
                                    <img src={PlaceholderImage} className={classes.image}/>
                                }
                                </Link>
                            </CardMedia>
                    </CardContent>
                </Card>
            </div >
        );
    };

    return (
        <>
            {news.map((news, i) => renderCard(news, i))}
        </>

    );
}

export default NewsCards;
