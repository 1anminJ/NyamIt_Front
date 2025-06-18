import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Community.css';

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isWriting, setIsWriting] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [selectedPost, setSelectedPost] = useState(null);
    const [editPost, setEditPost] = useState({ title: '', content: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!isWriting) fetchPosts();
    }, [isWriting]);

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setCurrentUserId(parseInt(payload.sub));
        }
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/community');
            setPosts(res.data);
            setHasError(false);
        } catch (err) {
            console.error('❌ 게시글을 불러올 수 없습니다:', err);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:8080/api/community',
                newPost,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setNewPost({ title: '', content: '' });
            setIsWriting(false);
        } catch (err) {
            console.error('❌ 게시글 저장 실패:', err.response?.data || err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await axios.delete(`http://localhost:8080/api/community/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
                }
            });
            setSelectedPost(null);
            fetchPosts();
        } catch (err) {
            console.error('❌ 게시글 삭제 실패:', err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/community/${selectedPost.id}`,
                editPost,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setIsEditing(false);
            setSelectedPost(null);
            fetchPosts();
        } catch (err) {
            console.error('❌ 게시글 수정 실패:', err.response?.data || err);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="community-main">
            <div className="community-header">
                <h1>Community</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="게시글 검색..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="write-button" onClick={() => setIsWriting(true)}>글쓰기</button>
                </div>
            </div>

            <div className="community-posts">
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : hasError ? (
                    <p>⚠️ 게시글을 불러오는 데 실패했습니다.</p>
                ) : filteredPosts.length === 0 ? (
                    <p>게시글이 없습니다.</p>
                ) : (
                    filteredPosts.map(post => (
                        <div
                            key={post.id}
                            className="community-card"
                            onClick={() => setSelectedPost(post)}
                        >
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p className="post-meta">작성자: {post.authorName} · {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>

            {/* 글쓰기 모달 */}
            {isWriting && (
                <div className="modal-backdrop" onClick={() => setIsWriting(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>글쓰기</h2>
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={newPost.title}
                            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                        />
                        <textarea
                            placeholder="내용을 입력하세요"
                            value={newPost.content}
                            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                        />
                        <div className="modal-footer">
                            <div className="left-buttons">
                                <button className="btn btn-gray" onClick={() => setIsWriting(false)}>취소</button>
                                <button className="btn btn-green" onClick={handleSave}>저장</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 보기/수정 모달 */}
            {selectedPost && (
                <div className="modal-backdrop" onClick={() => {
                    setSelectedPost(null);
                    setIsEditing(false);
                }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                />
                                <textarea
                                    value={editPost.content}
                                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                                />
                            </>
                        ) : (
                            <>
                                <h2>{selectedPost.title}</h2>
                                <p>{selectedPost.content}</p>
                            </>
                        )}
                        <p className="post-meta">
                            작성자: {selectedPost.authorName} · {new Date(selectedPost.createdAt).toLocaleDateString()}
                        </p>

                        <div className="modal-footer">
                            <div className="left-buttons">
                                {currentUserId === selectedPost.userId && (
                                    isEditing ? (
                                        <>
                                            <button className="btn btn-gray" onClick={() => setIsEditing(false)}>취소</button>
                                            <button className="btn btn-green" onClick={handleUpdate}>저장</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-gray" onClick={() => {
                                                setEditPost({
                                                    title: selectedPost.title,
                                                    content: selectedPost.content
                                                });
                                                setIsEditing(true);
                                            }}>수정</button>
                                            <button className="btn btn-red" onClick={() => handleDelete(selectedPost.id)}>삭제</button>
                                        </>
                                    )
                                )}
                            </div>
                            <div className="right-buttons">
                                <button className="btn btn-gray" onClick={() => {
                                    setSelectedPost(null);
                                    setIsEditing(false);
                                }}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
