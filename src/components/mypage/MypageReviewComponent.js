import { useEffect, useState } from "react";
import { getMyReview } from "../../api/productReviewApi";
import "../../css/mypageReviewComponent.css";
import RatingStarCompoent from "../common/RatingStarComponent";
import { Spinner } from "@chakra-ui/react";
import MypageTitleComponent from "../common/MypageTitleComponent";

// const initData = {
//     rating: 0,
//     reviewContent: "",
//     reviewFileName: "",
//     reviewDate: "",
//     productId: 0,
//     memberId: 0
// }

const prefix = "http://localhost:8080/api/productreview/view";

const MypageReviewComponent = () => {

    const [reviewData, setReviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        getMyReview().then(data => {

            setReviewData(data);
            // console.log(data);

        }).catch(e => console.log(e))
        .finally(()=>setIsLoading(true));

    }, []);

    return (
        <section>

            <MypageTitleComponent>
                내가 쓴 리뷰
            </MypageTitleComponent>
            <h3 className="text-xl my-5 ml-4">
                총 {reviewData.length}개 리뷰
            </h3>

            { !isLoading ?

            <div className="h-96 flex items-center justify-center">
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                />
            </div>
            
            :
            
            reviewData.length > 0 ?

            reviewData.map((review) =>

                <div className="p-5 ml-4 mb-5 border">
                    <div className="border-b pb-5 flex items-center">
                        <img className="w-32 h-20 object-cover mr-5"
                            src="/images/pr_mario.png"/>
                        <div className="text-2xl">
                            마리오 게임
                        </div>
                        {/* <div className="flex ml-auto w-40">
                            <button className="w-32 h-12 text-white mr-2 bg-amber-500 rounded hover:opacity-80">
                                수정하기
                            </button>
                            <button className="w-32 h-12 text-white bg-red-500 rounded hover:opacity-80">
                                삭제하기
                            </button>
                        </div> */}
                    </div>
                    <div className="flex items-center justify-between pt-5">
                        <div className="h-40 grow">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 mr-2 rounded-full border"
                                    src={review.memberImage != null ? `${prefix}/${review.memberImage}` : '/images/profile.png'} />
                                <div className="mr-2">
                                    {review.memberNickName}
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
            )
            
        :

        <div className="text-xl flex justify-center pt-28">
            작성한 리뷰가 없습니다.
        </div>

        }


        </section>
    );
}

export default MypageReviewComponent;