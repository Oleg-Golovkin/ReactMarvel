import useGetMarvelData from "../../services/GetMarvelData";
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

const CharAndComPage = ({Component, dataType}) => {
    const [comics, setComics] = useState({});
    const {spinner, error, resPostComics, resPostCharacter, clearError} = useGetMarvelData();
    const {id} = useParams();
    console.log(dataType);
    
    useEffect(()=>{        
            getServerComics();
    // eslint-disable-next-line
    }, [id])    
    
    const getServerComics = ()=> {
        clearError();
        switch (dataType) {
            case "comics":
                resPostComics(id)
                    .then(onAddComics)
                break;
            case "character":
                resPostCharacter(id)
                    .then(onAddComics)
            break;
        }
    }

    const onAddComics = (newComics) => {
        setComics(newComics);        
    } 

    const errorIcon = error ? <Error/> : null
    const spinnerIcon = spinner ? <Spinner/> : null
    const comic = !(error || spinner) ? <Component comics={comics}/> : null   
    return (
        <>            
            {spinnerIcon}            
            {errorIcon}           
            {comic}
        </>
    )
}

export default CharAndComPage;