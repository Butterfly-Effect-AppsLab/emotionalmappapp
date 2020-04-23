import React, { useEffect } from 'react';
import NewsCards from '../Components/NewsCards';

const NewsPage = () => {
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

    return (
        <div>
            <center><h1>Newsletter</h1></center>
            <NewsCards news={news} />
        </div>
    )
};

export default NewsPage;