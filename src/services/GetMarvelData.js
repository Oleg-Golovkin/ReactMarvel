import useHttp from "../components/hooks/useHttp"

const useGetMarvelData = ()=> {
    
    const address = 'https://gateway.marvel.com:443/v1/public/';

    const apikey = 'apikey=827ef5444e9fbf654e8fa51f975d051a';
    const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Impedit omnis qui fugit illum, voluptate iusto consequatur 
    rem officia doloribus eveniet quaerat odit exercitationem corporis,
    cum sit molestias, delectus officiis veniam?`;
    const offsetOffset = 0;     
    
    const {request, spinner, clearError, process, setProcess} = useHttp();

//__________ Код для загрузки персонажей___________//
    
    // Не обязательно. Чтобы иметь возможность обращаться
    // к разным адресам
    // Обращение к группе персонажей    
    const resPostAllCharacter = async (offsetCharacter = offsetOffset) => {        
        try {  
            const data = await request(`
            ${address}characters?limit=9&offset=${offsetCharacter}&${apikey}`
            )
            // Если возвращается массив с объектами, то вначале их
            // перебираем через .map, а затем также как в  resPostCharacter
            // берем каждый объект и извлекаем из него необходимые свойства.
            // В this._transformation не записываем аргумент, по скольку он туда
            // передается по умолчанию
            return await data.data.results.map(_transformationCharacter)
        } catch(e){}        
    }

    // Не обязательно. Чтобы иметь возможность обращаться
    // к разным адресам
    // Обращение к персонажу по id
    const resPostCharacter = async (id) => {
        try { 
            const data = await request(`
            ${address}characters/${id}?${apikey}`
            )
            return  _transformationCharacter(await data.data.results[0]);
        } catch(e){} 
    }

    const resPostCharacterSingle = async (name) => {
        try { 
            const data = await request(`        
            ${address}characters?name=${name}&${apikey}`
            )
            return  _transformationCharacter(await data.data.results[0]);
        } catch(e){} 
    }
    // Если описание персонажей приоходит пустое, то эта пустота
    // заменяется рондомным текстом
    const _сorrectionDescription = (description) => {
        if (description === "") {
            return description = lorem.slice(0, 200) + "..."
        }
    }

    //------------Вычленениe нужных данных из тех, которые приходят с 
    //сервера-------------------------------------------------------
    const _transformationCharacter = (char) => {
        return{
            name: char.name,
            img: char.thumbnail.path + "." + char.thumbnail.extension,
            description: _сorrectionDescription(char.description),
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }        
    }




    //___________ Часть кода, которая относится к данным комиксов____________//
    const resPostAllComics = async (offset = 0)=> {
        try{
            const aray = await request(`            
            ${address}comics?limit=8&offset=${offset}&${apikey}`)
            return await aray.data.results.map(transformationComics)
        } catch(e){}
    }

    const resPostComics = async (id) => {
        try {
 
        const data = await request(`

        ${address}comics/${id}?${apikey}`)
        return transformationComics(await data.data.results[0]);
        } catch(e){} 
    }
    //------------Вычленениe нужных данных из тех, которые приходят с 
    //сервера-------------------------------------------------------
    const transformationComics = (answer) => {
        return {
            title: answer.title,
            prices: answer.prices[0].price,
            img: answer.thumbnail.path + '.' + answer.thumbnail.extension,
            id: answer.id,
            urls: answer.urls
        }
    }

    return { 
        spinner, 
        clearError, 
        resPostAllCharacter, 
        resPostCharacter,
        resPostCharacterSingle,
        resPostAllComics,
        resPostComics,   
        process, 
        setProcess
    }
}



export default useGetMarvelData;


