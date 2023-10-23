import React from 'react'
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import requests from '../../api/requests'

export default function MainPage() {
    return (
        <div>
            <Banner />
            <Row isLargeRow title="Netflix Originals" id="TN" fetchUrl={requests.fetchNetfilexOriginals} />
            <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Vovies" id="Cm" fetchUrl={requests.fetchComedyMovies} />
        </div>
    )
}