// Этот компонент переписал с классового на функциональный. Поэтому
// оставшийся код от классового компанента закомментирован.

import './charInfo.scss';
import { useEffect, useState } from 'react';
import useGetMarvelData from '../../services/GetMarvelData';
import resultFSM  from '../../utils/resultsFSM'

import { CSSTransition } from 'react-transition-group'
const CharInfo = ({id}) => {    
    
    const [char, setChar] = useState(null);
    const {spinner, clearError, resPostCharacter, process, setProcess} = useGetMarvelData();
    
    const changeCharacter = () => {
        // Это условие блокирует создание компанента 
        // без получения id, а значит создание пустого компанента
        if (!id) {
            return
        }
        clearError();
        // Конструктор с запросом на сервер.       
        // Метод, в котором храниться в fetch 
        resPostCharacter(id)           
            .then(_creationChar)
            .then(()=> setProcess("completed"))
    }
    
    useEffect(()=>{
        changeCharacter();
    // Чтобы по следующей строке не выскакивала ошибка
     // eslint-disable-next-line
    }, [id])

    const _creationChar = async (char) => {
        setChar(char);
    } 
  
    return (
        <CSSTransition
            in={!spinner}
            timeout={600}
            classNames="my-node"
            >
                <div className="char__info my-node">          
                    {/* {result(process)} */}
                                    {/* {Третий аргумент данные - char. 
                                    Однако ниже в Char в props передал data, а не char. Поскольку
                                    в функции resultFSM props обозначен как data} */}
                    {resultFSM(process, Char, char)}
                </div>            
        </CSSTransition>
        
    )
}

const Char = ({data}) => {     
    const {name, img, homepage, wiki, description, comics} = data;
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