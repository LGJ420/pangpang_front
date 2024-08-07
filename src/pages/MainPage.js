import BannerComponent from "../components/BannerComponent";
import MainProductList from "../components/mainpage/MainProductListComponent";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {

    return (
        <BasicLayout>
        <BannerComponent />
        
        <section className="w-[1350px] my-5 mx-auto flex">
            <div className="w-1/2 mr-2 flex flex-col">
                <div className="text-2xl m-4">
                    공지사항
                </div>
                <div className="border-3 border-stone-900/30 rounded-md h-full">
                    풉키풉스
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