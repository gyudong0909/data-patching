import './reset.css';

import { useEffect, useState } from 'react';

import styles from './App.module.css';

type TodoResponse = {
  body : string;
  id: number;
  title: string;
  userId: number;
};


// 임시 댓글 데이터
const mockComments = [
  { id: 1, email: 'dsflj@naber.com', body: '이 글은 정말 흥미롭습니다!이 글은 정말 흥미롭습니다!  이 글은 정말 흥미롭습니다!' },
  { id: 2, email: 'dksjaf@sdjlfs.com', body: '동의합니다, 좋은 글이네요.' },
  { id: 3, email: 'dsjl@google.com', body: '이 부분에 대한 설명이 조금 더 필요해요.' },
];



export const App = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState<TodoResponse>();
  const n = 100; //임시 설정(버튼개수)


  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json() as Promise<TodoResponse>)
      .then((response) => { 
        if (ignore) return;
        setData(response);
       }).catch(() => {
        window.alert('데이터를 불러오는데 실패했습니다.')
       });
       return () => {
        ignore = true;
       };
  }, [id]);
  
  return (
  <div className={styles.wrapper}>
    <div className={styles.postList}>
      <div className={styles.title}>
        포스트 목록
      </div>
      <div>
        {Array.from({length: n}, (_, index) => (
          <button key={index}>
            <span className={styles.number}>
              {index + 1}.
            </span>
            <span className={styles.text}>
              
               ~~~~~ !!!!! @!@!@!#@! @!#@!$@ !!@#@!$@!#$!@#$@!$ !!!@#$#@#$ @#$@!#$!@$
            </span>
          </button>
        ))}
      </div>
    </div>
    <div className={styles.postContent}>
      <div className={styles.title}>
        내용
      </div>
      <div className={styles.text}>
        블라블라븝ㄹ라블라 내용이 들어가자~~~~~~~~~~~

      </div>
      <div className={styles.title}>
        댓글
      </div>
      <div className={styles.text}>
      {mockComments.map((comment) => (
        <div key={comment.id}>
          <div className={styles.name}>
            {comment.email}
          </div>
          <div className={styles.contentText}>
            {comment.body}
          </div>
        </div>
      ))}
      </div>
    </div>
  </div>
  );
};

