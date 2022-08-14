import './singleComic.scss';
import useGetMarvelData from "../../services/GetMarvelData";
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"
import { useState, useEffect } from 'react';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const SingleComic = () => {
    const [comics, setComics] = useState({});
    const {spinner, error, resPostComics, clearError} = useGetMarvelData();
    const path = useParams();

    useEffect(()=>{        
            getServerComics();
    // eslint-disable-next-line
    }, [path.id])

    const getServerComics = ()=> {
        clearError();
        resPostComics(path.id)
        .then(onAddComics)
    }

    const onAddComics = (newComics) => {
        setComics(newComics);
        
    } 

    const errorIcon = error ? <Error/> : null
    const spinnerIcon = spinner ? <Spinner/> : null
    const comic = !(error || spinner) ? <Comic comics={comics}/> : null   
    console.log(error);
    return (
        <>            
            {errorIcon}
            {spinnerIcon}
            {comic}
        </>
    )
}

const Comic = ({comics}) => {
    const {title, img, prices, id} = comics;

    return( 
        <div key={id} className="single-comic">
                <img src={img} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                    <p className="single-comic__descr">144 pages</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{prices}</div>
                </div>
                <NavLink to="/comics" className="single-comic__back">Back to all</NavLink>
        </div>
    )
};

export default SingleComic;