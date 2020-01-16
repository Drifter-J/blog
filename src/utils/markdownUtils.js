import moment from 'moment'

export function showOriginalAuthor(name) {
    let authorDesc = "";
    if ('undefined' !== typeof name && null != name) {
        authorDesc = "Original Author - " + name;
    }
    return authorDesc;
}

export function showDate(startTime, endTime) {
    let date = "";
    if ('undefined' !== typeof startTime && null != startTime) {
        date += moment(startTime).format("DD MMM YYYY");
    }
    if ('undefined' !== typeof endTime && null != endTime) {
        date += " ~ ";
        date += moment(endTime).format("DD MMM YYYY");
    }
    return date;
}
