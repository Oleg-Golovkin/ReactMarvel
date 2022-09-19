import useGetMarvelData from "../../services/GetMarvelData";
import { useState, useEffect } from 'react';
import resultFSM  from '../../utils/resultsFSM'

import { useParams } from 'react-router-dom';

const CharAndComPage = ({Component, dataType}) => {
    const [comics, setComics] = useState({});
    const {resPostComics, resPostCharacter, clearError, process, setProcess} = useGetMarvelData();
    const {id} = useParams();
    
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
                    .then(()=> setProcess("completed"))
                break;
            case "character":
                resPostCharacter(id)
                    .then(onAddComics)
                    .then(()=> setProcess("completed"))
            break;
            default:
                throw new Error('Unexpected process state');   
        }
    }

    const onAddComics = (newComics) => {
        setComics(newComics);        
    }
    return (
        <>
            {resultFSM(process, Component, comics)}
        </>
    )
}

export default CharAndComPage;