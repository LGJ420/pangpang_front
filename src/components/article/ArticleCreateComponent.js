import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomMove from "../../hooks/useCustomMove";
import { postCreate } from "../../api/articleApi";
import useCustomToken from '../../hooks/useCustomToken';
import { logout } from '../../hooks/logout';
import BodyTitleComponent from '../common/BodyTitleComponent';



const initState = {
  articleTitle: '',
  articleContent: ''
}



const ArticleCreateComponent = () => {
  const [article, setArticle] = useState({...initState});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useCustomToken();
  const { moveToList } = useCustomMove();



  useEffect(() => {
    if (!isLogin) {
      alert("잘못된 접근 방식입니다.");
      navigate(-1);
      return;
    }
  }, [isLogin, navigate]);



  const handleChangeArticle = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleClickCreate = async () => {
    if (article.articleTitle.length === 0) {
      alert("제목을 입력해주세요");
      return;
    } else if (article.articleContent.length === 0) {
      alert("내용을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      const result = await postCreate(article);
      console.log(result);
      setArticle({ ...initState });
      alert('글이 성공적으로 작성되었습니다!');
      moveToList();
    } catch (e) {      
      // console.error(e);
      if (e.response.status === 401) {
        // console.error("토큰 만료 : " + e)
        alert("토큰 유효 시간이 만료되었습니다.")
        logout();         
    } else {
      alert('제목, 내용을 모두 작성하여 주십시오.');
    }
    } finally {
      setLoading(false);
    }
  };



  if (!isLogin) {
    return null;
  }

  

  return (
    <section className="mb-10 text-2xl">
      <BodyTitleComponent title={`자유게시판`} path={`article`}/>
      <div className="my-10 flex flex-col">
        <label className="m-3 font-extrabold" htmlFor="articleTitle">
          제목
        </label>
        <input 
          className="p-3 rounded border" 
          onChange={handleChangeArticle} 
          id="articleTitle" 
          name="articleTitle" 
          value={article.articleTitle}
          placeholder="제목을 적어주세요." 
          maxLength={50} 
        />
      </div>

      <div className="my-10 flex flex-col">
        <label className="m-3 font-extrabold" htmlFor="articleContent">
          내용
        </label>
        <textarea 
          className="p-3 rounded border h-[50rem]" 
          onChange={handleChangeArticle} 
          id="articleContent" 
          name="articleContent" 
          value={article.articleContent}
          placeholder="내용을 적어주세요." 
          maxLength={2000} 
        />
      </div>

      <div className="flex justify-center">
        <button
          className="w-52 h-16 text-3xl bg-[rgb(77,160,124)] text-white hover:opacity-80"
          onClick={handleClickCreate}
          disabled={loading}
        >
          {loading ? '작성 중...' : '작성하기'}
        </button>
      </div>
    </section>
  );
};

export default ArticleCreateComponent;