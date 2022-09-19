import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchСharacter from '../searchСharacter/SearchСharacter';

import decoration from '../../resources/img/vision.png';
import { useState } from "react";



const MainPage = () => {
    const [id, setId] = useState(null);
    const [character, setCharacter] = useState(null);

    function getId(num){
        setId(num)
    }

    return(  
        <> <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList 
                    getId = {getId}
                    id = {id}                        
                    />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo                         
                            id = {id}
                        />           
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchСharacter
                        character= {character}
                        setCharacter = {setCharacter} />          
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
    
}

export default MainPage 