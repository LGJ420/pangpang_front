import { useLocation } from "react-router-dom";
import FooterLayout from "./FooterLayout";
import NavLayout1 from "./NavLayout1";
import NavLayout2 from "./NavLayout2";
import { useEffect } from "react";

const BasicNoHeightLayout = ({children}) => {

    const location = useLocation();

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
        <NavLayout1 />
        <NavLayout2 />
        
        <main className="w-[1350px] m-auto">
            {children}
        </main>

        <FooterLayout />
        </>
    );

}

export default BasicNoHeightLayout;