import './comicsList.scss';
import useGetComicsData from "../../services/GetComicsData";
import { useState, useEffect } from 'react';
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"

const ComicsList = ()=>{

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(52693);
    const {spinner, error, resPostAllComics} = useGetComicsData()
    const {activeBTN, setActiveBTN} = useState(true);


    
    useEffect(()=>{
        getServerComics();
    // eslint-disable-next-line
    }, [])

    const getServerComics = (offset)=> {
        console.log(offset);
        resPostAllComics(offset)
        .then(onAddComics)
    }

    const onAddComics = (newComics) => {
        setComics([...comics, ...newComics]);
        setOffset(offset + 9);
        console.log(comics);
        if(newComics.length < 9) {
            setActiveBTN(true);
            console.log(activeBTN);
        }
        
    }
    
    const li =  comics.map(item => {
            const {title, img, prices, id, urls} = item
            return(
                <li key={id} className="comics__item">
                    <a href={urls}>
                        <img src={img} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{prices}</div>
                    </a>
                </li>
            )
        }) 

    const errorIcon = error ? <Error/> : null
    const spinnerIcon = spinner ? <Spinner/> : null
    

        return (
            <div className="comics__list">
                <ul className="comics__grid">
                {li}
                {errorIcon}
                {spinnerIcon}
                </ul>
                <button
                onClick={()=> {getServerComics(offset)}}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default ComicsList;