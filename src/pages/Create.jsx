import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create({ addPost }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addPost(title, content, imageUrl);
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Post</h1>

            <input
                type="text"
                placeholder="Post title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <button type="submit">Create</button>
        </form>
    );
}
