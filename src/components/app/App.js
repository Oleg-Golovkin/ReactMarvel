import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"

import decoration from '../../resources/img/vision.png';

import { useState } from "react";

const App = () => {
    const [id, setId] = useState(null);
    const [showComicsList, setShowComicsList] = useState(false);
    const [showCharList, setShowCharList] = useState(true);
    
    function getId(num){
        setId(num)
    }

    function onShowComicsList() {
        setShowComicsList(true)
        setShowCharList(false)
    }
    function onShowCharList() {
        setShowComicsList(false)
        setShowCharList(true)
    }
    

    return (
        <div className="app">
            <AppHeader 
            onShowComicsList={onShowComicsList}
            onShowCharList={onShowCharList}
            />
            <main>
                    <RandomChar showCharList={showCharList}/>
                <div
                style={{display: showComicsList ? 'block' : 'grid'}}
                className="char__content">
                    <ErrorBoundary>
                        <CharList 
                        getId = {getId}
                        id = {id}
                        showCharList={showCharList}
                        />
                    </ErrorBoundary> 
                    <ErrorBoundary>
                        <CharInfo 
                        showCharList={showCharList}
                        id = {id}
                        />
                    </ErrorBoundary>                    
                    <ErrorBoundary>
                        <ComicsList
                        showComicsList={showComicsList}
                        />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )    
}

export default App;