import AppHeader from "../appHeader/AppHeader";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import ComicsList from "../comicsList/ComicsList"
import {ComicsPage, MainPage} from "../pages"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    } from "react-router-dom";



const App = () => {
     

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
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                            <ComicsPage/>
                            </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )    
}

export default App;