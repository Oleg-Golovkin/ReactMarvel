import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"


const ComicsPage = ({getId}) => {
    return(
        <>
            <ErrorBoundary>
                <ComicsList getId={getId}/>
            </ErrorBoundary>
        </> 
    )
}

export default ComicsPage