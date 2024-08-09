import { useLocation } from "react-router-dom";
import FooterLayout from "./FooterLayout";
import NavLayout1 from "./NavLayout1";
import NavLayout2 from "./NavLayout2";
import { useEffect } from "react";

const BasicLayout = ({children}) => {

    const location = useLocation();

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
        <NavLayout1 />
        <NavLayout2 />
        
        <main className="min-h-[800px] min-w-[1350px]">
            {children}
        </main>

        <FooterLayout />
        </>
    );

}

export default BasicLayout;