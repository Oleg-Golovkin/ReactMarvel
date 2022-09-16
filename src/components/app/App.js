import AppHeader from "../appHeader/AppHeader";
import {ComicsPage, MainPage, SingleComic, SingleСharacter} from "../pages"

import { lazy, Suspense } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes
    } from "react-router-dom";
// import Page404 from "../pages/Page404";
const Page404 = lazy(()=>{import("../pages/Page404")})


const App = () => {
    return (
        //1. Маршрутизатор - оборачивать всю страницу.
        // Чтобы были рабочими все ссылки
        <Router>  
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<span> sdfsdfsdf</span>}>
                    {/* 3. Переключатель маршрутов*/}
                        <Routes>
                            {/*3. Маршрут - в нем прописываем маршрут.
                            3.1 path атрибут - в нем пишем адрес (не файла с 
                            компонентом, а создаем свой адрес). Адрес пишем в 
                            кавычках.
                            3.2. exact атрибут - чтобы было конкретное совпадение адреса.
                            Без него path ищет плохо*/}
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/comics" element={<ComicsPage/>}/>
                                <Route path="/comics/:id" element={<SingleComic/>}/>                                
                                <Route path="/character/:name" element={<SingleСharacter/>}/>                                
                                <Route path="*" element={<Page404/>}/>                                
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )    
}

export default App;