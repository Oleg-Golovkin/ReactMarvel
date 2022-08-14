import { Component } from "react/cjs/react.production.min";
import Error from "../error/error";


class ErrorBoundary extends Component {
    state = {
        error: false
    }
    
    componentDidCatch(){
        // this.props.setError(true)
        this.setState({
            error: true
        })
        console.log("catch");
    }

    render() {
        if(this.state.error) {
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