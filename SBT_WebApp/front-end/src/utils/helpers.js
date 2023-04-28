import dayjs from 'dayjs';


export function getRandomHexCode() {
    // Generate a random number between 0 and 16777215 (decimal equivalent of ffffff)
    const randomDecimal = Math.floor(Math.random() * 16777216);
    
    // Convert the decimal number to hex and pad with leading zeros if necessary
    const hexCode = randomDecimal.toString(16).padStart(6, "0");
    
    // Return the hex code with a leading pound sign (#)
    return "#" + hexCode;
  }


 export function formatUnixTimestamp(timestamp) {
    return dayjs(timestamp).format('DD - MMM - YY');
  }

 export function findObjectByValue(str, arr) {
    return arr.find((obj) => obj.value === str);
  }