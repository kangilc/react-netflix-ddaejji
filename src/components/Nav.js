import React, { useEffect, useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })

        return () => {
            window.removeEventListener("scroll", () => { });
        }
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);

    }

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt='Netflix logo'
                src='https://i.namu.wiki/i/1ZuECrXyntz0CBkyffv-PAWkzAEXkjrRFmWgnjYNsNl4yImZWscT3pNVKvmu6GUA0kbmjjJ60bzDe2yuK9CeVA.svg'
                className='nav__logo'
                onClick={() => window.location.reload()}
            />

            <input 
            value={searchValue} 
            onChange={handleChange} 
            className='nav__input' 
            type='text' 
            placeholder='영화를 검색해주세요.'
            />

            <img
                alt='User logged'
                src='https://i.namu.wiki/i/ggmL5JMNaNpjyF16k3p-vMuePaqiS1RcaSL-5uCfxbqwOJzRcgaqAUUE40c4b9Wtz4sBrgJtkSqgsnxvZ0Y71bAojWM3M9pZc-xDWt-YM86gT1SAYXijwsbm2iUHdDgqxqhy2f6rM5nWKKGbqlcoMA.svg'
                className='nav__avatar'
            />
        </nav>
    );
}
