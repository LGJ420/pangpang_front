// 날짜를 yyyy. mm. dd. 오전/오후 hh:mm 형식으로 바꿔줌
export const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const formattedDate = date.toLocaleDateString('en-GB'); // Use 'en-GB' for DD/MM/YYYY format
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Convert DD/MM/YYYY to YYYY.MM.DD
    const [day, month, year] = formattedDate.split('/');
    const formattedDateString = `${year}.${month}.${day}`;

    return `${formattedDateString} ${formattedTime}`;
};