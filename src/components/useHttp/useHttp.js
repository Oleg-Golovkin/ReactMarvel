import {useState, useCallback} from "react"


const useHttp = () => {
    const [spinner, setSpinner] = useState(false);  
    const [error, setError] = useState(false);
    // 1. request - будет содержаться ответ от свервера. Далее в callback функции прописываем получение данных с 
    // сервера через fetch
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'})=> {
        // В момент загрузки появляется спиннер 
        setSpinner(true)

        try {
            // Запрос данных на сервер 
            const response =  await fetch(url, {method, body, headers});
            // Поскольку в response будет возвращаться не ответ, а Promise, для получения
            // данных прописываем еще переменную. .json() - метод преобразования полученных
            // данных в формат json
            const data = await response.json()
            // После загруки данных выключаем спиннер.
            setSpinner(true)
            // Возвращаем в переменную reqest полученные в переменной data данные 
            return data
        } catch(e) {

        }
        
        
        return (
           
        )
    }, [])



    return {}
}