import { Link } from "react-router-dom";
import '../App.css'

export default function Navbar() {
    return (
        <nav>
            <h2>Fall 2025 Blog</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/create">Create Post</Link>
            </div>
        </nav>
    );
}
