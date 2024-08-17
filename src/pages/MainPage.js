import BannerComponent from "../components/BannerComponent";
import MainProductList from "../components/main/MainProductListComponent";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {

    return (
        <BasicLayout minWidth={'85rem'}>
        <BannerComponent />
        
        <section className="w-[1350px] my-5 mx-auto flex">
            <div className="w-1/2 mr-2 flex flex-col">
                <div className="text-2xl m-4">
                    공지사항
                </div>
                <div className="flex flex-col items-center justify-center text-2xl font-semibold border-3 border-stone-900/30 rounded-md h-full">
                    <img src="/images/no_notice.png" className="w-60" />
                    <div className="mt-10">현재 공지사항이 없습니다</div>
                </div>
            </div>
            <div className="w-1/2">
                <div className="text-2xl m-4">
                    추천 상품
                </div>
                <div className="h-[383px] ml-2 rounded-md">
                    <MainProductList />
                </div>
                <div className="text-2xl m-4">
                    신규 상품
                </div>
                <div className="h-[383px] ml-2 rounded-md">
                    <MainProductList />
                </div>
            </div>
        </section>

        </BasicLayout>
    );
}

export default MainPage;