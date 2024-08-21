import { useParams } from "react-router-dom";
import NoticeReadComponent from "../../components/notice/NoticeReadComponent";

const NoticeReadPage = () => {

    const {id} = useParams();

    return (

        <NoticeReadComponent id={id} />

    );

}

export default NoticeReadPage;