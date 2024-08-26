import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, putOne } from "../../api/articleApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomToken from "../../hooks/useCustomToken";

const initState = {
  id: 0,
  articleTitle: '',
  articleContent: '',
};

const ArticleModifyComponent = () => {
  const { id } = useParams();
  const { moveToRead } = useCustomMove();
  const { isLogin, decodeToken } = useCustomToken();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ ...initState });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOne(id);
        setArticle(data);
      } catch (error) {
        console.error("글을 불러오는데 실패했습니다.", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (!isLogin) {
      alert("잘못된 접근 방식입니다.");
      navigate(-1);
      return;
    }
  }, [isLogin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickModify = async () => {
    setLoading(true);
    try {
      await putOne(id, article);
      alert('수정이 완료되었습니다!');
      moveToRead(id);
    } catch (error) {
      console.error("수정에 실패했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    moveToRead(id);
  };

  if (!isLogin) {
    return null;
  }

  return (
    <section className='pt-10 pl-10 pb-10 pr-3 mb-5'>
      <h1 className="text-5xl mr-auto">게시글 수정</h1>
        <div className="my-10 flex flex-col">
          <label
            className="m-3 font-extrabold"
            htmlFor="articleTitle">
            제목
          </label>
          <input 
            className="p-3 rounded border"
            id="articleTitle"
            name="articleTitle"
            value={article.articleTitle}
            onChange={handleChange}
            placeholder="제목을 적어주세요."
            maxLength={100}/>
        </div>

        <div className="my-10 flex flex-col">
          <label
            className="m-3 font-extrabold"
            htmlFor="articleContent">
            내용
          </label>
          <textarea 
            className="p-3 rounded border h-[50rem]"
            id="articleContent"
            name="articleContent"
            value={article.articleContent}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
            maxLength={2000}
            style={{whiteSpace: 'pre-wrap'}}
          />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            className="w-52 h-16 text-3xl bg-orange-600 text-white rounded-2xl hover:opacity-80"
            onClick={handleClickModify}
            disabled={loading}
          >
            {loading ? '저장 중...' : '저장'}
          </button>
          <button
            className="w-52 h-16 text-3xl bg-gray-600 text-white rounded-2xl hover:opacity-80"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
    </section>
  );
};

export default ArticleModifyComponent;