import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchСharacter from '../searchСharacter/SearchСharacter';

import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import {Helmet} from 'react-helmet'


const MainPage = () => {
      return(  
        <>  
             <Helmet>
                <meta charSet="utf-8" />
                <title>MainPage</title>
                <meta name="description" content="Page Comics" />
            </Helmet>

            <div className="char__content">
                              
            </div>
            <img/>
        </>
    )
    
}

export default MainPage