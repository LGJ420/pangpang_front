import BodyTitleComponent from "../../components/common/BodyTitleComponent";
import SupportComponent from "../../components/support/SupportComponent";
import BasicLayout from "../../layouts/BasicLayout";

const SupportIndexPage = () => {

    return (

        <BasicLayout width={'85rem'} minHeight={'85rem'}>

            <BodyTitleComponent title={`고객센터`} path={`support`}/>

            <SupportComponent />

        </BasicLayout>
    );
}

export default SupportIndexPage;