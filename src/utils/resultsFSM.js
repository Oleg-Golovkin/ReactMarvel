import Spinner from "../components/Spinner/spinner"
import Error from "../components/error/error.js"
import Skeleton from "../components/skeleton/Skeleton"
// Поставил по умолчнию для компанента и данные, поскольку 
// не вовсех местах в эту функцию буду помещать компанент и 
// соответственно данные. Null для компанента не подойдет,
// поскольку в него должна возвращаться функция или 
// строка
const resultFSM = (process, Component = (()=>{}), data = null, waiting=true) => {
    switch (process) {
        case 'waiting':
            return waiting ? <Skeleton/> : null;          
        case "loading": 
            return <Spinner/>            
        case "error": 
            return <Error/>            
        case 'completed':
            return <Component data={data}/>
        // case ""
        default:
                throw new Error('Unexpected process state');                
    }
} 

export default resultFSM


