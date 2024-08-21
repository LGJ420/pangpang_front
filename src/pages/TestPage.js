import BasicLayout from "../layouts/BasicLayout";
import "../test.css";

const data = [
    { id: 1, title: '첫 번째 글', author: '홍길동', date: '2023-08-20', views: 150 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    // 추가 데이터를 여기에 넣으세요.
  ];

const TestPage = () => {

    return (

        <BasicLayout>

            <section>

            <div className='w-[80rem] text-xl m-auto grid grid-cols-10'>
                {/* 헤더 행 */}
                <div className='h-12 flex items-center justify-center col-span-1 font-bold'>글번호</div>
                <div className='h-12 flex items-center justify-center col-span-6 font-bold'>제목</div>
                <div className='h-12 flex items-center justify-center col-span-1 font-bold'>작성자</div>
                <div className='h-12 flex items-center justify-center col-span-1 font-bold'>등록일</div>
                <div className='h-12 flex items-center justify-center col-span-1 font-bold'>조회수</div>

                {/* 데이터 행 */}
                {data.map((item) => (
                <>
                <div className='h-12 flex items-center justify-center col-span-1'>{item.id}</div>
                <div className='h-12 flex items-center justify-center col-span-6'>{item.title}</div>
                <div className='h-12 flex items-center justify-center col-span-1'>{item.author}</div>
                <div className='h-12 flex items-center justify-center col-span-1'>{item.date}</div>
                <div className='h-12 flex items-center justify-center col-span-1'>{item.views}</div>
                </>
            ))}
            </div>

            </section>
            
        </BasicLayout>

    );
}

export default TestPage;