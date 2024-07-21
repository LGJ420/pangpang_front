import FooterLayout from "./FooterLayout";
import NavLayout from "./NavLayout";

const BasicLayout = ({children}) => {

    return (
        <>
        <NavLayout />
        
        <div className="min-h-[700px]">
            {children}
        </div>

        <FooterLayout />
        </>
    );

}

export default BasicLayout;