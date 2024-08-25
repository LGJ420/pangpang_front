import { useNavigate } from "react-router-dom";

const BodyTitleComponent = ({title, path}) => {

    const navigate = useNavigate();

    const handleClickTitle = () => {

        navigate(`/${path}`);
    }


    return (

        <h1 className="pt-10 pl-7 mb-10 w-96 text-5xl cursor-pointer"
            onClick={()=>{
                if(path){
                    handleClickTitle();
                }
            }}>
            {title}
        </h1>

    );

}

export default BodyTitleComponent;