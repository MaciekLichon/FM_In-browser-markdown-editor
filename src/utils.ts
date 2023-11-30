const adjustNumber = (number: number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}

export const getTodaysDate = () => {
    const date = new Date();

    const day = adjustNumber(date.getDate());
    const month = adjustNumber(date.getMonth() + 1);
    const year = adjustNumber(date.getFullYear());

    return `${day}-${month}-${year}`;
}