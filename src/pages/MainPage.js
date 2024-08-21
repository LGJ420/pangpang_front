import BannerComponent from "../components/BannerComponent";
import MainNoticeListComponent from "../components/main/MainNoticeListComponent";
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
                
                <MainNoticeListComponent />
                    
            </div>
            
            <div className="w-1/2">
                <div className="text-2xl m-4">
                    추천 상품
                </div>
                <div className="h-[23rem] ml-2 rounded-md">
                    <MainProductList />
                </div>
                <div className="text-2xl m-4">
                    신규 상품
                </div>
                <div className="h-[23rem] ml-2 rounded-md">
                    <MainProductList />
                </div>
            </div>
        </section>

        </BasicLayout>
    );
}

export default MainPage;