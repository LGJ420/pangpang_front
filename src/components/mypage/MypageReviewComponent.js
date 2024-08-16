import { useEffect, useState } from "react";
import { getMyReview } from "../../api/productReviewApi";
import "../../css/mypageReviewComponent.css";
import RatingStarCompoent from "../common/RatingStarComponent";

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

    useEffect(() => {

        getMyReview().then(data => {

            setReviewData(data);

        }).catch(e => console.log(e));

    }, []);

    return (
        <section>

            <h3 className="text-xl font-bold mb-5">
                총 {reviewData.length}개 리뷰
            </h3>

            {reviewData.map((review) =>

                <div className="w-11/12 m-auto p-5 mb-5 border rounded-lg">
                    <div className="border-b pb-5 flex items-center">
                        <img className="w-32 h-20 object-cover mr-5"
                            src="/images/pr_mario.png"/>
                        <div className="text-2xl">
                            마리오 게임
                        </div>
                        <div className="flex ml-auto w-40">
                            <button className="w-32 h-12 text-white mr-2 bg-amber-500 rounded hover:opacity-80">
                                수정하기
                            </button>
                            <button className="w-32 h-12 text-white bg-red-500 rounded hover:opacity-80">
                                삭제하기
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                        <div className="h-40 grow">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 mr-2 rounded-full border"
                                    src="/images/profile.png" />
                                <div className="mr-2">
                                    아이디입니당
                                </div>
                                <div>

                                    <RatingStarCompoent score={review.rating} />

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
                                src={review.reviewFileName.length > 0 ? `${prefix}/${review.reviewFileName}` : `/images/no_image.png`} />
                        </div>
                    </div>
                    </div>

            )}


        </section>
    );
}

export default MypageReviewComponent;