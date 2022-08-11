import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useGetMarvelData from "../../services/GetMarvelData";
import { useState, useEffect } from 'react';
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"
import { useParams } from 'react-router-dom';

const SingleComic = () => {
    const [comics, setComics] = useState({});
    const [offset, setOffset] = useState(52693);
    const [hideBTN, setHideBTN] = useState(false);
    const {spinner, error, resPostComics, clearError} = useGetMarvelData();
    const path = useParams();

    useEffect(()=>{        
            getServerComics();
            console.log(path);        
    // eslint-disable-next-line
    }, [])

    const getServerComics = ()=> {
        clearError();
        resPostComics(path.id)
        .then(onAddComics)
        console.log(comics);
    }

    const onAddComics = (newComics) => {
        console.log(newComics);
        setComics(newComics);
        setOffset(offset + 9);
        if(newComics.length < 8) {
            setHideBTN(true);            
        }        
    }
    const {title, img, prices, id} = comics

    return (
 
        <div className="single-comic">
            <img src={img} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;