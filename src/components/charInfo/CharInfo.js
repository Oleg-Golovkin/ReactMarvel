// Этот компонент переписал с классового на функциональный. Поэтому
// оставшийся код от классового компанента закомментирован.

import './charInfo.scss';
import { useEffect, useState } from 'react';
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"
import Skeleton from "../skeleton/Skeleton"
import useGetMarvelData from '../../services/GetMarvelData';


const CharInfo = ({id}) => {    
    
    const [char, setChar] = useState(); 

    const {error, spinner, clearError, resPostCharacter} = useGetMarvelData();

    const changeCharacter = () => {
        // Если id еще не выбран, то команды ниже не 
        // запустятся, поскольку сработает return
        // const {id} = this.props
        
        if(!id) {
            return
        }
        // Конструктор с запросом на сервер.       
        
        // Метод, в котором храниться в fetch        
        resPostCharacter(id)
            // Промисы
            // Не обязательно. Запись состояния вынесена 
            // в отдельную функцию this._setState. Полученный
            // ответ от сервера записывается в эту функцию без явного
            // написания об этом.
            // .then(char=> this._setState(char)) длинная запись;
            .then(_creationChar)
        clearError()
    }  
    
    useEffect(()=>{
        changeCharacter();    
    // Чтобы по следующей строке не выскакивала ошибка
    // eslint-disable-next-line
    }, [])

    
    useEffect(()=>{
        changeCharacter();    
    // Чтобы по следующей строке не выскакивала ошибка
     // eslint-disable-next-line
    }, [id])

    const _creationChar = (char) => {
        setChar(char);       
    }

    // Если спиннер в позиции true то показывается он
    const loading = spinner ? <Spinner/> : null
    // Если ошибка в позиции true то показывается она
    const errorMessage = error ? <Error/> : null        
    // Если задействованны или спиннер, ошибка, выбран персонаж, то ничего не показывается,
    // а если ничего не задействованно то показывается заглушка (скелетон)
    const skeleton = spinner || error || char ? null : <Skeleton/>  
    // Если отключены спиннер, ошибка и выбран персонаж, то показывается
    // персонаж
    const charInfo = !(spinner || error || !char) ? <Char char = {char}/> : null
    
    return (
        <div 
        className="char__info">               
            {skeleton}
            {loading}
            {charInfo}
            {errorMessage}
        </div>
    )
    
}



const Char = ({char}) => {    
    const {name, img, homepage, wiki, description, comics} = char;
    let styleRandomchar = {};   
    if(img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleRandomchar = {objectFit: "contain"}
    } else {
        styleRandomchar = {objectFit: "cover"}
    }
    return(
        <>
            <div className="char__basics">
                <img style={styleRandomchar} src={img} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">
                {comics.length === 0 ? "Комиксы отсутствуют" : "Comics:"}
                </div>
            <ul className="char__comics-list">
                {comics.map((item, i)=>{
                    if (i > 9) {
                        return null
                    }                                       
                    return( 
                        <li key={item.name} className="char__comics-item">
                            {item.name}
                        </li>
                    )                    
                })}                
            </ul>        
        </>
    )
}

export default CharInfo;