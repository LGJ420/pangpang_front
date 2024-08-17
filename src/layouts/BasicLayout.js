import { useLocation } from "react-router-dom";
import FooterLayout from "./FooterLayout";
import NavLayout1 from "./NavLayout1";
import NavLayout2 from "./NavLayout2";
import { useEffect } from "react";
import styled from 'styled-components';

const BasicLayout = (
        {
            children,
            width, height, minWidth, minHeight,
            margin="auto",
            isFooter=true
        }
    ) => {

    const location = useLocation();

    const Main = styled.main`
        width: ${width};
        height: ${height};
        min-width: ${minWidth};
        min-height: ${minHeight};
        margin: ${margin};
    `;

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
        <NavLayout1 />
        <NavLayout2 />
        
        <Main>{children}</Main>

        { isFooter ? 
        <FooterLayout />
        :
        <></>
        }
        </>
    );

}

export default BasicLayout;