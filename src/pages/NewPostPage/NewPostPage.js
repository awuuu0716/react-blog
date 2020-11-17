import { useState} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { newPost } from '../../WebAPI';

const ErrorMessage = styled.div`
  color: red;
`;

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    newPost(title, content).then((response) => {
      if (response.ok === 0 ) return setErrorMessage(response.message);
      history.push('/');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
