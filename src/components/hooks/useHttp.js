    // Импортируем хуки
    import {useState, useCallback} from "react"

    const useHttp = () => {
        // Чтобы по умолчанию иконки загрузки и ошибки были выключены
        const [spinner, setSpinner] = useState(false);  
        const [error, setError] = useState(null);
        // 1. request - будет содержаться ответ от свервера. Далее в callback функции прописываем получение данных с 
        // сервера через fetch
        const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'})=> {
            // В момент загрузки появляется спиннер 
            setSpinner(true)

            try {
                // Запрос данных на сервер 
                const response =  await fetch(url, {method, body, headers});
                
                if (!response.ok) {
                    setError(true)
                } else {
                    setError(false)
                };                
                const data = await response.json()
                // После загруки данных выключаем спиннер.
                setSpinner(false)                
                // Возвращаем в переменную reqest полученные в переменной data данные 
                return data
            } catch(e) {                
                // И иконка спиннера уберется, поскольку и так будет ошибка
                setSpinner(false)
                // throw e
            }
        }, [])

        const clearError =  useCallback(() => {
            return setError(null)
        // Пустой массив для того, чтобы callback функция загружалась
        // один раз
        }, []);
        return {request, spinner, error, setError, clearError};
    }

    export default useHttp
