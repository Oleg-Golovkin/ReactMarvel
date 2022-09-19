// Этот компонент переписал с классового на функциональный. Поэтому
// оставшийся код от классового компанента закомментирован.

import './charList.scss';
import { useState, useEffect} from 'react';
import useGetMarvelData from '../../services/GetMarvelData';
import resultFSM  from '../../utils/resultsFSM'
const CharList = ({getId}) => {    

    const [chars, setChars] = useState([]);
    const [counter, setCounter] = useState(1548);
    const [noActiveBTN, setNoActiveBTN] = useState(false);
    const [finishedChars, setFinishedChars] = useState(false);
    const [activeCardChars, setActiveCardChars] = useState(null);

    const {clearError, resPostAllCharacter, process, setProcess} = useGetMarvelData();
    console.log(process);
    // При загрузке страницы сразу подгружаем персонажей
    useEffect(()=> {
        getServerChars();
        
    // eslint-disable-next-line            
    }, [])

    // 2п Поскольку при подгрузке персонажей меняем состояние
    // автоматически вызывается этот метод жизненного цикла компанента, 
    // который подгружает еще персонажей
    useEffect(()=>{
        getServerChars();
        
    // eslint-disable-next-line
    }, [counter])    

    // Метод загрузки персонажей.
    // 1з действия при загруке персонажей. 
    const getServerChars = () => {  
        clearError()      
        // 1з вызываем импортированный экземпляр класса

            // 2з вызываем его метод, который принимает
            // число, от которого идет отсчет загружаемых персонажей,
        resPostAllCharacter(counter)
            // 3з при положительном вызываем метод создания персонажей
            // eslint-disable-next-line
            .then(_creationChars)
            .then(()=> setProcess("completed"))
        
    }
    // При нажатии на кнопку подгружаем еще персонажей.
    // 1п действия при подгрузке    
    const onCharsLoading = () => { 
        setCounter(counter + 9);
        setNoActiveBTN(true)               
    }
    // 4з создание персонажей, который автоматически
    // в пункте 3з принимает аргумент с загруженным с сервера
    // массивом персонажей
    const _creationChars = (plusChars)=> {
        if (plusChars.length > 0) {
             // 5з объединяем массив с загруженными персонажами с 
            //     // массивом очередных погружаемых
            setChars([...chars, ...plusChars ]);
            setNoActiveBTN();
    } 
        // Если персонажи закончились
        if (plusChars.length < 9) {
            setFinishedChars(true); 
        }       
    }
    
    const onInstallationIdChars = (num)=> {        
        setActiveCardChars(num)
    } 

    // Создание повторяющейся верстки с различным содержанием - разными персонажами
    function Chars() {   
        return chars.map((item, i) => {                
                let styleRandomchar = {};   
                if(item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    styleRandomchar = {objectFit: "contain"}
                } else {
                    styleRandomchar = {objectFit: "cover"}
                }
                // Для выделения нажимаемой карты с персонажем Charachter
                // Если id нажимаемого персонажа равен id из id из состояния 
                // activeCardChars, то в эту переменную записывается tru
                let active = activeCardChars === item.id
                const clazz = active ? "char__item_selected" : ""
                return(
                    <li
                    onClick={()=> {
                        // Для помещения id в головной файл app 
                        getId(item.id)
                        // Для помещения id в состояние этого файла 
                        onInstallationIdChars(item.id)}}
                    className = {`char__item ${clazz}`}
                    // Каждой карточке присваиваем порядковый номер, чтобы была возможность
                    // выбрать карточнку а клавиатуре
                    tabIndex={i+1}
                    key={item.id}
                    onKeyPress={(e) => {                        
                        if (e.key === ' ' || e.key === "Enter") {
                            getId(item.id)
                            onInstallationIdChars(item.id)
                        }
                        
                    }}>
                        <img style={styleRandomchar} src={item.img} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )                
            }); 
    }
    
    return (
        <div
        className="char__list">
            <ul className="char__grid"> 
            {/* Chars не должен перезаписываться в , иначе
            контент на странице будет прыгать */}
                <Chars/>
                {resultFSM(process)}
            </ul>
            <button
                disabled={noActiveBTN}
                onClick={onCharsLoading}
                style={{"display" : finishedChars ? "none" : "block"}}
                className="button button__main button__main_active button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )    
}

export default CharList;