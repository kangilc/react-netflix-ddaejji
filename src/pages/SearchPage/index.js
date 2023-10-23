import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // console.log("🚀 ~ file: index.js:7 ~ useQuery ~ useLocation():", useLocation());
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    // console.log("🚀 ~ file: index.js:12 ~ SearchPage ~ searchTerm:", searchTerm);

    useEffect(() => {
        if (debounceSearchTerm) {
            fetchSearchMovie(debounceSearchTerm);
        }
    }, [debounceSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        console.log("🚀 ~ file: index.js:28 ~ fetchSearchMovie ~ searchTerm:", searchTerm);
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            )
            // console.log("🚀 ~ file: index.js:28 ~ fetchSearchMovie ~ request:", request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("🚀 ~ file: index.js:31 ~ fetchSearchMovie ~ error:", error);
        }
    };

    const rederSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'person'){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <div className='movie' key={movie.id}>
                                <div onClick={() => navigate(`/${movie.id}`)}
                                    className='movie_-column-poster'
                                >
                                    <img 
                                        src={movieImageUrl}
                                        alt="movie image"
                                        className='movie__poster'
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>
                        찾고자 하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
        );
    };

    return rederSearchResults();
}
