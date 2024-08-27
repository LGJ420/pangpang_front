// 날짜를 yyyy. mm. dd. 오전/오후 hh:mm 형식으로 바꿔줌
export const formatDateTime = (dateTime) => {

    const date = new Date(dateTime);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; // 초 단위 제거

};