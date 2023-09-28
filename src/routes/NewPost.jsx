import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import metFetch from '../axios/config';

import './NewPost.css';

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setbody] = useState();

  const createPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await metFetch.post('/posts', {
      body: post,
    });

    navigate('/');
  };

  return (
    <div className="new-post">
      <h2>Inserir um novo post</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título do Post:</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo do Post:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setbody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;
