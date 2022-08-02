import { Component } from "react/cjs/react.production.min";
import Error from "../error/error";


class ErrorBoundary extends Component {
    
    
    componentDidCatch(){
        this.props.setError(true)
    }

    render() {
        if(this.props.error) {
            return(
                <>
                    <Error/>
                </>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary