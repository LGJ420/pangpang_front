import BannerComponent from "../components/BannerComponent";
import MainNoticeListComponent from "../components/main/MainNoticeListComponent";
import MainProductList from "../components/main/MainProductListComponent";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {

    return (
        <BasicLayout minWidth={'85rem'}>
        <BannerComponent />
        
        <section className="w-[1350px] my-14 mx-auto flex">
            <div className="w-1/2 mr-8 flex flex-col">
                
                <MainNoticeListComponent />
                    
            </div>
            
            <div className="w-1/2 h-[50rem]">

                <div className="flex flex-col h-[calc(50%-1rem)] border mb-8 box-border">
                    <div className="h-14 flex items-center pt-5 pl-7 text-3xl font-bold mb-5 bg-[rgb(255,255,255)]">
                        추천 상품
                    </div>
                    <div className="h-3/4">
                        <MainProductList />
                    </div>
                </div>
                <div className="flex flex-col h-[calc(50%-1rem)] border">
                    <div className="h-14 flex items-center pt-5 pl-7 text-3xl font-bold mb-5 bg-[rgb(255,255,255)]">
                        신규 상품
                    </div>
                    <div className="h-3/4">
                        <MainProductList />
                    </div>
                </div>

            </div>

        </section>

        </BasicLayout>
    );
}

export default MainPage;