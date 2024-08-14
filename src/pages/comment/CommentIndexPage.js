import { Outlet } from 'react-router-dom';
import BasicNoHeightLayout from '../../layouts/BasicNoHeightLayout'; 

const CommentIndexPage = () => {
    return (
        <BasicNoHeightLayout>
            <Outlet /> 
        </BasicNoHeightLayout>
    );
};

export default CommentIndexPage;