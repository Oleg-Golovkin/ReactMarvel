import './comicsList.scss';
import useGetMarvelData from "../../services/GetMarvelData";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import resultFSM  from '../../utils/resultsFSM'


const ComicsList = ()=>{
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(52693);
    const [hideBTN, setHideBTN] = useState(false);
    const {resPostAllComics, clearError, process, setProcess} = useGetMarvelData();

    useEffect(()=>{        
            getServerComics();        
    // eslint-disable-next-line
    }, [])

    const getServerComics = (offset)=> {
        clearError();
        resPostAllComics(offset)
        .then(onAddComics)
        .then(()=> setProcess("completed"))
    }
    const onAddComics = (newComics) => {
        setComics([...comics, ...newComics]);   
        setOffset(offset + 9);
        if(newComics.length < 8) {
            setHideBTN(true);            
        }        
    }

    function Li(){
        return comics.map(item => {
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
    } 
    
    // Здесь не нужно проверять на третье условие, мол чтобы спиннер и 
    // ошибка были выключены, поскольку будет создана новая переменная и перересован
    // компонент в момент загруки. И в этот момент верстка будет прыгать, т.е. не будет
    // плавно добавляться компонент.
        return (
            <div
            className="comics__list">
                <ul className="comics__grid">
                <Li/> 
                {resultFSM(process)}    
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