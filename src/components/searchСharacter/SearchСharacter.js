import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import useGetMarvelData from "../../services/GetMarvelData";
import {
    NavLink
    } from "react-router-dom";

import resultFSM  from '../../utils/resultsFSM'


import './searchСharacter.sass';
import '../randomChar/randomChar.scss';

const SearchСharacter = ({character, setCharacter}) => {
    const {resPostCharacterSingle, process, setProcess} = useGetMarvelData();

    const аvailabilityComics = (name)=> {
        resPostCharacterSingle(name)
                .then(data=> setCharacter(data))
                .then(()=>setProcess('completed'))
    }
    const foundCharacter = character 
                            ? <СharacterFound 
                            name= {character.name}
                            id = {character.id}/> 
                            : null;
    const foundNotCharacter = character === undefined 
                            ? <СharacterNotFound/>
                            : null;
    console.log(process);
    return(
        <Formik
        initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .required("Поле не должно быть пустым")
                        .min(3, "Минимум два символа")
            })}
            onSubmit ={values=> аvailabilityComics(values.name)}>
            <Form className='char__info search-character'>
                <label 
                    htmlFor="name"
                    className='search-character__lable'>
                    Or find a character by name:
                </label>
                <div
                className="search-character__wrapper">
                    <Field
                        placeholder= "Enter name"
                        id='name'
                        name='name'
                        type='text'>                
                    </Field>
                    <div
                    className="search-character__wrapper-button">
                        <button 
                        className="button button__main"
                        type='submit'>
                            <div className="inner">FIND</div>
                        </button>                        
                    </div>
                    {foundCharacter}                   
                </div>
                {foundNotCharacter}                
                {resultFSM(process, ()=>{}, null, false)}
                <ErrorMessage 
                    name="name" 
                    component="div" /> 
            </Form>
        </Formik>
    )
}

const СharacterFound = ({name, id}) => {
    return(
        <>
            <h2 
            className="search-character__h2"
                >There is! Visit {name} page?</h2>
            <NavLink to= {`/character/${id}`} 
            className="button button__secondary">
                <div 
                className="inner">TO PAGE</div>
            </NavLink>
        </>        
    )
}

const СharacterNotFound = () => {
    return (
        <h2>The character was not found. Check the name and tru again</h2>
    )
}

export default SearchСharacter