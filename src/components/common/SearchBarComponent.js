import styled from 'styled-components';

const Search = styled.main`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;

const SearchBarComponent = ({width, height, changeFn, clickFn}) => {

    return (
        <Search width={width} height={height}>
            <div className="h-14 text-xl flex justify-between border-2 overflow-hidden focus-within:border-blue-500 focus-within:shadow-outline">
                <input className="px-4 py-2 w-11/12 focus:outline-none" type="text" placeholder="검색"
                    onChange={changeFn}
                    onKeyDown={(e)=>{if(e.key==="Enter"){clickFn()}}} />
                <button className="flex items-center justify-center px-4 border-l"
                    onClick={clickFn}>
                    <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </Search>
    );

}

export default SearchBarComponent;