import useHttp from "../components/hooks/useHttp";

const useGetComicsData = () => {
    const {request, spinner, error, setError, clearError} = useHttp();
    const apikey = `827ef5444e9fbf654e8fa51f975d051a`

    const resPostAllComics = async (offset = 0)=> {
        const aray = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=9&offset=${offset}&apikey=${apikey}`)
        return await aray.data.results.map(item => transformation(item))
    }

    const transformation = (answer) => {
        return {
            description: answer.description,
            prices: answer.prices[0].price,
            img: answer.thumbnail.path
        }
    }
    return{spinner, error, setError, resPostAllComics, clearError}
}

export default useGetComicsData