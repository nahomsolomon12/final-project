import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Update({ posts, updatePost }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // Get post OR fallback empty object
    const post = posts.find(p => p.id === Number(id)) || {
        title: "",
        content: "",
        image_url: ""
    };

    // State must ALWAYS be called — so we use fallback post above
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [imageUrl, setImageUrl] = useState(post.image_url);

    // Now safe to branch AFTER hooks
    if (!posts.find(p => p.id === Number(id)))
        return <p>Post not found.</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePost(Number(id), title, content, imageUrl);
        navigate(`/post/${id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Post</h1>

            <input value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea value={content} onChange={e => setContent(e.target.value)} />
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />

            <button>Save</button>
        </form>
    );
}
