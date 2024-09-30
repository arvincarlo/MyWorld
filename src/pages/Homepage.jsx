import { Link } from "react-router-dom"
import PageNav from "../components/PageNav"

function Homepage() {
    return (
        <div>
            <PageNav></PageNav>
            <h1>Travel Destinations</h1>
            <Link to="/pricing">Pricing</Link>
        </div>
    )
}

export default Homepage
