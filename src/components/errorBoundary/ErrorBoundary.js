import { Component } from "react";
import Error from "../error/error";


class ErrorBoundary extends Component {
    state = {
        error: false
    }
    
    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
        console.log("catch");
    }
    // static getDerivedStateFromError(error) {
    //     // Обновите состояние так, чтобы следующий рендер показал запасной интерфейс.
    //     return { error: true };
    //   }

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