import { useParams } from "react-router-dom";
import NoticeModifyComponent from "../../components/notice/NoticeModifyComponent";

const NoticeModifyPage = () => {

    const {id} = useParams();

    return (

        <NoticeModifyComponent id={id} />

    );

}

export default NoticeModifyPage;