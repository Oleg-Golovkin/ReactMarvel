import './appHeader.scss';

const AppHeader = ({onShowComicsList, onShowCharList}) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <button href="#">
                    <span>Marvel</span> information portal
                </button>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><button 
                    onClick={onShowCharList}
                    href="#">Characters
                    </button></li>
                    /
                    <li><button 
                    href="#"
                    onClick={onShowComicsList}
                    >Comics</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;