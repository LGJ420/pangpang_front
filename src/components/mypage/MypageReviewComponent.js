import { useEffect, useState } from "react";
import { getMyReview } from "../../api/productReviewApi";
import "../../css/mypageReviewComponent.css";
import RatingStarCompoent from "../common/RatingStarComponent";
import { Spinner } from "@chakra-ui/react";
import MypageTitleComponent from "../common/MypageTitleComponent";
import { logout } from '../../hooks/logout';
import { useNavigate } from "react-router-dom";


const initData = {
    
    rating: 0,
    reviewContent: "",
    reviewFile: null,
    reviewFileName: "",
    reviewDate: "",
    memberId: 0,
    memberImage: "",
    memberNickName: "",
    productId: 0,
    productTitle: "",
    productImages: [ "" ]
    
}

const prefix = "http://localhost:8080/api/productreview/view";

const MypageReviewComponent = () => {

    const [reviewData, setReviewData] = useState([initData]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        getMyReview().then(data => {

            setReviewData(data);
            // console.log(data);

        }).catch(e => {
            
            // console.log(e);
        
            if (e.response && e.response.status === 401) {
                alert("토큰 유효 시간이 만료되었습니다.")
                logout(); // import { logout } from '../../hooks/logout'; 추가 필요
            }

        })
        .finally(()=>setIsLoading(true));

    }, []);

    return (
        <section>

            <MypageTitleComponent>
                내가 쓴 리뷰
            </MypageTitleComponent>



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
            
            reviewData.length > 0 && reviewData[0].memberId !== 0 ?
            
            <>
            <h3 className="text-xl my-5 ml-4">
                총 {reviewData.length}개 리뷰
            </h3>
            
            {reviewData.map((review) =>

                <div className="p-5 ml-4 mb-5 border">
                    <div className="border-b pb-5 flex items-center cursor-pointer"
                        onClick={()=>navigate(`/product/read/${review.productId}`)}>
                        <img className="w-32 h-20 object-contain mr-5"
                            src={`${prefix}/${review.productImages[0]}`}
                            onError={(e) => {
                                e.target.onerror = null; // 무한 루프 방지
                                e.target.src = "/images/no_image.png"; // 대체 이미지 경로
                            }}/>
                        <div className="text-2xl">
                            {review.productTitle}
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                        <div className="h-40 grow">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 mr-2 rounded-full border"
                                    src={`${prefix}/${review.memberImage}`}
                                    onError={(e) => {
                                        e.target.onerror = null; // 무한 루프 방지
                                        e.target.src = "/images/profile.png"; // 대체 이미지 경로
                                    }} />
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
                                src={review.reviewFileName.length > 0 ? `${prefix}/${review.reviewFileName}` : `/images/no_image.png`}
                                onError={(e) => {
                                    e.target.onerror = null; // 무한 루프 방지
                                    e.target.src = "/images/no_image.png"; // 대체 이미지 경로
                                }}/>
                        </div>
                    </div>
                </div>
            )}
            </>

            :

            <div className="text-xl flex justify-center pt-28">
                작성한 리뷰가 없습니다.
            </div>
            
            }


        </section>
    );
}

export default MypageReviewComponent;