import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPosts } from '../../WebAPI';

const Root = styled.div`
  width: 40%;
  margin: 0 auto;
`;
const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &:hover {
    background: rgba(200, 200, 200, 0.1)
  }
`;
const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
 color: rgba(0, 0, 0, 0.8)
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <Root>
      {posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </Root>
  );
}
