import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function PostPage({ posts, deletePost, upvotePost }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // Grab the post (may be undefined on first render)
    const post = posts.find(p => p.id === Number(id));

    // Hooks MUST always run:
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    // Load comments
    useEffect(() => {
        const loadComments = async () => {
            const { data, error } = await supabase
                .from("comments")
                .select("*")
                .eq("post_id", id)
                .order("created_at", { ascending: true });

            if (!error) setComments(data);
        };

        loadComments();
    }, [id]);

    // Safe fallback while data loads
    if (!post) {
        return (
            <div className="post-page">
                <p>Loading post...</p>
            </div>
        );
    }

    const submitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const { data, error } = await supabase
            .from("comments")
            .insert([{ text: commentText, post_id: id }])
            .select();

        if (!error && data) {
            setComments(prev => [...prev, data[0]]);
            setCommentText("");
        }
    };

    return (
        <div className="post-page">
            <h1>{post.title}</h1>
            <p>{post.created_at}</p>
            <p>{post.content}</p>

            {post.image_url && <img src={post.image_url} alt="Post" />}

            <button onClick={() => upvotePost(post.id, post.upvotes)}>
                Upvote ({post.upvotes})
            </button>

            <button onClick={() => navigate(`/update/${post.id}`)}>
                Edit
            </button>

            <button
                onClick={() => {
                    deletePost(post.id);
                    navigate("/");
                }}
            >
                Delete
            </button>

            <hr />
            <h3>Comments</h3>

            {comments.length === 0 && <p>No comments yet.</p>}

            {comments.map(c => (
                <div key={c.id} className="comment-box">
                    <p>{c.text}</p>
                </div>
            ))}

            <form onSubmit={submitComment}>
                <input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add comment..."
                />
                <button>Comment</button>
            </form>
        </div>
    );
}
