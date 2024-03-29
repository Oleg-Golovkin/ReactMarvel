// Этот компонент переписал с классового на функциональный. Поэтому
// оставшийся код от классового компанента закомментирован.

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useGetMarvelData from '../../services/GetMarvelData'
import { useState, useEffect} from 'react';
import resultFSM  from '../../utils/resultsFSM'


const RandomChar = () => {  
    // Записываем состояние в отдельное совойство, 
    // а не в корень, чтобы иметь возможность расширять 
     // состояния дописывая в него новые свойства
    const [char, setChar] = useState({});    
    
    const {clearError, resPostCharacter, process, setProcess} = useGetMarvelData();

    // Не обязательно. Выводим отдельную в функцию
    // запись состояния
    const _setState = (char) => { 
        setChar(char);
    }

    // Загрузка данных из сервера
    // для сайта
    const changeCharacter = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        // const id = 1
        // Спиннер запускается в момнет запроса данных с сервера
        // в рабках функции resPostCharacter, в котором функция request, в которой запускается
        // спиннер        
        // Метод, в котором храниться в fetch        
        resPostCharacter(id)
        // Промисы
        // Не обязательно. Запись состояния вынесена 
        // в отдельную функцию this._setState. Полученный
        // ответ от сервера записывается в эту функцию без явного
        // написания об этом.
        // .then(char=> this._setState(char)) длинная запись;
            .then(_setState)
            .then(()=> setProcess("completed"))
        
            // Поведение ошибки прописано в resPostCharacter=>request=>
    }
    
    useEffect(()=> {
        changeCharacter();    
    // Чтобы по следующей строке не выскакивала ошибка
    // eslint-disable-next-line
    }, [])   
    
    return (
        <div
        className="randomchar">            
                {resultFSM(process, RandomCharShow, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={changeCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>               
        </div>
    )

}


const RandomCharShow = ({data}) => {    
    const {name, img, homepage, wiki, description} = data;
    let styleRandomchar = {};   
    if(img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleRandomchar = {objectFit: "contain"}
    } else {
        styleRandomchar = {objectFit: "cover"}
    }
    return (
        <div className="randomchar__block">
            <img style={styleRandomchar} src={img} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;