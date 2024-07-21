import FooterLayout from "./FooterLayout";
import NavLayout1 from "./NavLayout1";
import NavLayout2 from "./NavLayout2";

const BasicLayout = ({children}) => {

    return (
        <>
        <NavLayout1 />
        <NavLayout2 />
        
        <main className="h-screen">
            {children}
        </main>


        <FooterLayout />
        </>
    );

}

export default BasicLayout;