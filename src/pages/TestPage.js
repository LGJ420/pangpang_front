import BasicWidthLimitLayout from "../layouts/BasicWidthLimitLayout";
import "../test.css";

const TestPage = () => {

    return (

        <BasicWidthLimitLayout>

        <section>
        <div className="flex border-b pt-10 pl-10 pb-10 pr-3 mb-5">
            <h1 className="text-5xl mr-auto">리뷰 작성</h1>
        </div>
        <div className="flex flex-col items-center">
            <h3>
                해당 상품의 평점을 매겨주세요
            </h3>
            <div>
                <fieldset id="rate">
                    <input type="radio" id="rating10" name="rating" value="10" />
                    <label for="rating10" title="5점"></label>
                    
                    <input type="radio" id="rating9" name="rating" value="9" />
                    <label class="half" for="rating9" title="4.5점"></label>
                    
                    <input type="radio" id="rating8" name="rating" value="8" />
                    <label for="rating8" title="4점"></label>
                    
                    <input type="radio" id="rating7" name="rating" value="7" />
                    <label class="half" for="rating7" title="3.5점"></label>
                    
                    <input type="radio" id="rating6" name="rating" value="6" />
                    <label for="rating6" title="3점"></label>
                    
                    <input type="radio" id="rating5" name="rating" value="5" />
                    <label class="half" for="rating5" title="2.5점"></label>
                    
                    <input type="radio" id="rating4" name="rating" value="4" />
                    <label for="rating4" title="2점"></label>
                    
                    <input type="radio" id="rating3" name="rating" value="3" />
                    <label class="half" for="rating3" title="1.5점"></label>
                    
                    <input type="radio" id="rating2" name="rating" value="2" />
                    <label for="rating2" title="1점"></label>
                    
                    <input type="radio" id="rating1" name="rating" value="1" />
                    <label class="half" for="rating1" title="0.5점"></label>
                </fieldset>
            </div>

            <h3 className="mt-10">
                자세한 평가를 적어주세요
            </h3>
            <textarea className="border m-4" />
            <button>
                등록
            </button>
            
        </div>
        </section>

        </BasicWidthLimitLayout>
    );
}

export default TestPage;