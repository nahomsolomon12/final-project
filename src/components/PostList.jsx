import '../App.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

export default function PostList({ posts }) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("time");

    const filtered = posts
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "time") return new Date(b.created_at) - new Date(a.created_at);
            if (sort === "upvotes") return b.upvotes - a.upvotes;
            return 0;
        });

    return (
        <div className="posts-page">
            <div className="search-sort">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="time">Sort by Creation Time</option>
                    <option value="upvotes">Sort by Upvotes</option>
                </select>
            </div>

            {filtered.map(post => (
                <Link key={post.id} to={`/post/${post.id}`}>
                    <PostCard post={post} />
                </Link>
            ))}
        </div>
    );
}
