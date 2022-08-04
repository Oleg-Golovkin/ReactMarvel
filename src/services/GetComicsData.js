import useHttp from "../components/hooks/useHttp";

const useGetComicsData = () => {
    const {request, spinner, error, setError, clearError} = useHttp();
    const apikey = `827ef5444e9fbf654e8fa51f975d051a`

    const resPostAllComics = async (offset = 0)=> {
        try{
            const aray = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=${apikey}`)
            return await aray.data.results.map(item => transformation(item))
        } catch(e){}
    }

    const transformation = (answer) => {
        return {
            title: answer.title,
            prices: answer.prices[0].price,
            img: answer.thumbnail.path + '.' + answer.thumbnail.extension,
            id: answer.id,
            urls: answer.urls
        }
    }
    return{spinner, error, setError, resPostAllComics, clearError}
}

export default useGetComicsData