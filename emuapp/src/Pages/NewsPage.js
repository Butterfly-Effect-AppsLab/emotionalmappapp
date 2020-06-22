import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NewsCards from '../Components/NewsCards';
import Loading from '../Components/Loading';
import { LIGHTGRAY } from '../utils/colours';

const useStyles = makeStyles({
    root: {
        minHeight: '100%',
        background: LIGHTGRAY,
        paddingTop: 10,
    },
});

const NewsPage = () => {
    const classes = useStyles();
    const [news, setNews] = React.useState([]);

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(data => {
                setNews(data.data);

            }).catch(resp => {
                console.error(resp);
            });
    }, [])

    // if (news) {
    //     return (
    //         <div className={classes.root}>
    //             <NewsCards news={news} />
    //         </div>
    //     )
    // }
    // else
        return <Loading />
};

export default NewsPage;