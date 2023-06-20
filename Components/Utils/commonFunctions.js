
export function convertToDateString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
    let day = date.getDate();

    let dateStr = `${year}-${month}-${day}`;
    return dateStr;
}