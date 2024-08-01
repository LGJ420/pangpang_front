import BannerComponent from "../components/BannerComponent";
import MainProductList from "../components/product/MainProductListComponent";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {

    return (
        <BasicLayout>
        <BannerComponent />
        
        <section className="w-[1350px] my-5 mx-auto flex">
            <div className="w-1/2 mr-2 border border-solid rounded-md">
                풉키풉스
            </div>
            <div className="w-1/2">
                <div className="h-[300px] ml-2 mb-3 border border-solid rounded-md">
                    <MainProductList />
                </div>
                <div className="h-[300px] ml-2 mt-3 border border-solid rounded-md">
                    캬캬캬
                </div>
            </div>
        </section>

        </BasicLayout>
    );
}

export default MainPage;