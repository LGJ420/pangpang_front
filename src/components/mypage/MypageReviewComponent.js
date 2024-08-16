import { useEffect, useState } from "react";
import { getMyReview } from "../../api/productReviewApi";

const initData = {
    rating: 0,
    reviewContent: "",
    reviewFileName: "",
    reviewDate: "",
    productId: 0,
    memberId: 0
}

const prefix = "http://localhost:8080/api/productreview/view";

const MypageReviewComponent = () => {

    const [reviewData, setReviewData] = useState([initData]);

    useEffect(()=>{

        getMyReview().then(data=>{

            setReviewData(data);

        }).catch(e=>console.log(e));

    },[]);

    return (
        <section>
        
            <h3 className="text-xl font-bold mb-5">
                총 {reviewData.length}개 리뷰
            </h3>
          
            {reviewData.map((review)=>
          
            <div className="w-11/12 m-auto h-52 p-5 mb-5 flex items-center justify-between border rounded-lg">
              <div className="h-full grow">
                <div className="flex items-center">
                  <img src="/images/profile.png" className="w-10 h-10 rounded-full border"/>
                  <div>
                    아이디입니당
                  </div>
                  <div>
                    {review.rating}
                  </div>
                </div>
                <div>
                  {review.reviewDate}
                </div>
                <p className="mt-3">
                  {review.reviewContent}
                </p>
              </div>
              <div className="ml-4">
                <img 
                    className="w-60 h-40 object-contain border"
                    src={review.reviewFileName.length > 0 ? `${prefix}/${review.reviewFileName}` : `/images/no_image.png`}/>
              </div>
            </div>

            )}


        </section>
    );
}

export default MypageReviewComponent;