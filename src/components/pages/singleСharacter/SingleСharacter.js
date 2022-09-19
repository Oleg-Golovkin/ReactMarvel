import '../singleComic/singleComic.scss';

import { NavLink } from 'react-router-dom';


const SingleСharacter = ({data}) => {
    const {title, img, prices, id} = data;
    return( 
        <div key={id} className="single-comic">
                <img src={img} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                    <p className="single-comic__descr">144 pages</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{prices}</div>
                </div>
                <NavLink to="/comics" className="single-comic__back">Back to all</NavLink>
        </div>
    )
};

export default SingleСharacter;