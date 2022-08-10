import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const MainPage = () => {
    const [id, setId] = useState(null);
    
    function getId(num){
        setId(num)
    } 
    return(  
        <>
            <RandomChar/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList 
                    getId = {getId}
                    id = {id}                        
                    />
                </ErrorBoundary> 
                <ErrorBoundary>
                    <CharInfo                         
                    id = {id}
                    />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
    
}

export default MainPage