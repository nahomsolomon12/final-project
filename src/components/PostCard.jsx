import '../App.css';

export default function PostCard({ post }) {
    if (!post) return null;

    return (
        <div className="post-card">
            <p>{post.created_at}</p>
            <h2>{post.title}</h2>
            <p>{post.content?.slice(0, 80)}...</p>
            <p>Upvotes: {post.upvotes}</p>
        </div>
    );
}
