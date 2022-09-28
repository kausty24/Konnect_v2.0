import { Link } from "react-router-dom";

function PageNotFound(){

    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div>
                <h2>404 Page not Found</h2><br /> 
                <Link to="/">Back to Home</Link>
                </div>
                
            </div>
        </div>
    )
}

export default PageNotFound;