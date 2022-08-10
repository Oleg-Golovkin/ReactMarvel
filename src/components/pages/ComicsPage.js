import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"


const ComicsPage = () => {
    <>
        <ErrorBoundary>
            <ComicsList/>
        </ErrorBoundary>
    </> 
}

export default ComicsPage