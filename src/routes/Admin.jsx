import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import metFetch from '../axios/config';
import './Admin.css';

const Admin = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await metFetch.get('/posts');

      const data = response.data;

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    await metFetch.delete(`/posts/${id}`);

    const filteredPost = posts.filter((post) => post.id !== id);

    setPosts(filteredPost);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="admin">
      <h1>Gerenciar posts</h1>
      {posts === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions">
              <Link to={`/posts/edit/${post.id}`} className="btn edit-btn">
                Editar postagem
              </Link>
              <button
                className="btn delete-btn"
                onClick={() => deletePost(post.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
