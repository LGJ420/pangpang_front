import { atom, selector } from "recoil";


// 아톰이란 리코일에서 사용하는 용어
// 아톰은 데이터 그 자체를 의미
export const orderState = atom({

    key: 'orderState',
    default: []
});



// 셀렉터는 아톰을 이용해서 처리할 수 있는 기능
// 근데 딱히 쓸일이없어서 주석처리함
// export const orderTotalState = selector({

//     key: 'orderTotalState',
//     get: ({get}) => {

//         const arr = get(orderState);

//         const initialValue = 0;

//         const total = arr.reduce((total, current)=>
//             total + current.productPrice * cartCount, initialValue);

//         return total;
        
//     }
// })