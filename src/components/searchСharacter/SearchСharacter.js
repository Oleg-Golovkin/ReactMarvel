import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'

import './searchСharacter.sass';
import '../randomChar/randomChar.scss';


const SearchСharacter = () => {
    return(
        <Formik
        initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .required()
                        .min(2, "Минимум два символа")
            })}
            onSubmit ={values=> console.log(JSON.stringify(values, null, 2))}>
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
                    <h2 
                    className="search-character__h2"
                        >There is! Visit ${} page?</h2>
                    <button 
                    className="button button__secondary">
                        <div 
                        className="inner">TO PAGE</div>
                    </button>
                </div>                
                
                          
            </Form>
        </Formik>
    )
}

// const SearchСharacter = () => {
//     return(
//         <h2>dasd</h2>
//     )
// }

export default SearchСharacter