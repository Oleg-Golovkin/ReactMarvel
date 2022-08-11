import AppHeader from "../appHeader/AppHeader";
import {ComicsPage, MainPage, SingleComic} from "../pages"
import Page404 from "../pages/Page404";

import {
    BrowserRouter as Router,
    Route,
    Routes
    } from "react-router-dom";

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
                    <Routes>
                        {/*3. Маршрут - в нем прописываем маршрут.
                        3.1 path атрибут - в нем пишем адрес (не файла с 
                        компонентом, а создаем свой адрес). Адрес пишем в 
                        кавычках.
                        3.2. exact атрибут - чтобы было конкретное совпадение адреса.
                        Без него path ищет плохо*/}
                            <Route path="/" element={<MainPage/>}/>                                
                            <Route path="/comics" element={<ComicsPage getId= {getId}/>}/>
                            <Route path="/comics/:id" element={<SingleComic/>}/>                                
                            <Route path="*" element={<Page404/>}/>                                
                    </Routes>
                </main>
            </div>
        </Router>
    )    
}

export default App;