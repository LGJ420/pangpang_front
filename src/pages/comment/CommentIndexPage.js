import { Outlet } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout'; 

const CommentIndexPage = () => {

    return (

        <BasicLayout width={'85rem'}>

            <Outlet /> 

        </BasicLayout>
    );
};

export default CommentIndexPage;