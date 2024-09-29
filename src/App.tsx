import './reset.css';

import { useEffect, useState } from 'react';

import styles from './App.module.css';

type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

type Comment = {
  id: number;
  email: string;
  body: string;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [comments, setComments] = useState<Comment[]>([]);

  const selectedPost = posts.find((p) => p.id === selectedId) ?? posts.at(0);

  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json() as Promise<Post[]>)
      .then((response) => {
        if (ignore) return;
        setPosts(response);
        if (!(response[0] == null)) {
          const firstPostId = response[0].id;
          setSelectedId(firstPostId);
          fetchComments(firstPostId);
        }
      })
      .catch(() => {
        window.alert('데이터를 불러오는데 실패했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const fetchComments = (postId: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json() as Promise<Comment[]>)
      .then((response) => {
        setComments(response);
      })
      .catch(() => {
        window.alert('댓글 데이터를 불러오는데 실패했습니다.');
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.postList}>
        <div className={styles.title}>포스트 목록</div>
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <button
                key={post.id}
                onClick={() => {
                  setComments([]);
                  setSelectedId(post.id);
                  fetchComments(post.id);
                }}
              >
                <span className={styles.number}>{post.id}.</span>
                <span className={styles.text}>{post.title}</span>
              </button>
            ))
          ) : (
            <p className={styles.text}>로딩중입니다...</p>
          )}
        </div>
      </div>
      <div className={styles.postContent}>
        <div className={styles.title}>내용</div>
        <div className={styles.text}>
          {selectedPost != null ? selectedPost.body : '로딩중입니다...'}
        </div>
        <div className={styles.title}>댓글</div>
        <div className={styles.text}>
          {comments.length > 0
            ? comments.map((comment) => (
                <div key={comment.id}>
                  <div className={styles.name}>{comment.email}</div>
                  <div className={styles.contentText}>{comment.body}</div>
                </div>
              ))
            : '로딩중입니다....'}
        </div>
      </div>
    </div>
  );
};
