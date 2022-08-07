import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    } from "react-router-dom";

import decoration from '../../resources/img/vision.png';

import { useState } from "react";

const App = () => {
    const [id, setId] = useState(null);
    
    function getId(num){
        setId(num)
    }    

    return (
        //1. Маршрутизатор - оборачивать всю страницу.
        // Чтобы были рабочими все ссылки
        <Router>  
            <div className="app">
                <AppHeader/>
                <main>
                    {/* 3. Переключатель маршрутов*/}
                    <Switch>
                        {/*3. Маршрут - в нем прописываем маршрут.
                        3.1 path атрибут - в нем пишем адрес (не файла с 
                        компонентом, а создаем свой адрес). Адрес пишем в 
                        кавычках.
                        3.2. exact атрибут - чтобы было конкретное совпадение адреса.
                        Без него path ищет плохо*/}
                            <Route exact path="/"> 
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
                            </Route>
                            <Route exact path="/comics">
                                <ErrorBoundary>
                                    <ComicsList/>
                                </ErrorBoundary>
                            </Route>
                    </Switch>
                </main>
            </div>
        </Router>
       
    )    
}

export default App;