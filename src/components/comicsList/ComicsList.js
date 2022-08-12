import './comicsList.scss';
import useGetMarvelData from "../../services/GetMarvelData";
import { useState, useEffect } from 'react';
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"
import { NavLink } from 'react-router-dom';

const ComicsList = ({getId})=>{

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(52693);
    const [hideBTN, setHideBTN] = useState(false);
    const {spinner, error, resPostAllComics, clearError} = useGetMarvelData();

    useEffect(()=>{        
            getServerComics();        
    // eslint-disable-next-line
    }, [])

    const getServerComics = (offset)=> {
        clearError();
        resPostAllComics(offset)
        .then(onAddComics)
    }

    const onAddComics = (newComics) => {
        setComics([...comics, ...newComics]);
        setOffset(offset + 9);
        if(newComics.length < 8) {
            setHideBTN(true);            
        }        
    }
    
    const li =  comics.map(item => {
            const {title, img, prices, id} = item
            return(
                    <li key={id} className="comics__item">
                        <NavLink to={`/comics/${id}`}>
                            <img src={img} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{prices}</div>
                        </NavLink>
                    </li>
            )
        }) 

    const errorIcon = error ? <Error/> : null
    const spinnerIcon = spinner ? <Spinner/> : null

        return (
            <div
            className="comics__list">
                <ul className="comics__grid">
                {li}
                {errorIcon}
                {spinnerIcon}
                </ul>
                <button
                onClick={()=> {getServerComics(offset)}}
                style={{display: hideBTN ? "none" : "block"}}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default ComicsList;