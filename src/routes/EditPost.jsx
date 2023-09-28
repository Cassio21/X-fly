import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import metFetch from '../axios/config';

const EditPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setbody] = useState();

  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await metFetch.get(`/posts/${id}`);

      const data = response.data;

      setTitle(data.title);
      setbody(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await metFetch.put(`/posts/${id}`, {
      body: post,
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="new-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título do Post:</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ''}
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo do Post:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setbody(e.target.value)}
            value={body || ''}
          ></textarea>
        </div>
        <input type="submit" value="Editar post" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
