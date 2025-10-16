


//Hur långtid kvar på hyrtiden hyrestiden slut tas filem bort från local storage
export function rentalTimeLeft(id, startTime, {hour=0, min=0, sec=0}){

    const currentDateTime = Date.now();
    const rentedMoviesList = JSON.parse(localStorage.getItem('rental') || '[]')


    const timeToRent = (hour * 3600000) + (min * 60000) + (sec * 1000);
    const endTime = startTime + timeToRent;
    const timeLeft = endTime - currentDateTime;

    const safeTimeLeft = Math.max(timeLeft, 0);
    const hoursLeft = Math.floor(safeTimeLeft / 3600000);
    const minutesLeft = Math.floor((safeTimeLeft % 3600000) / 60000);
    const secondsLeft  = Math.floor((safeTimeLeft % 60000) / 1000);

    

  
    return `${hoursLeft} tim ${minutesLeft} min. ${secondsLeft} sek.`


}
//konvertera och snygga till Date objekt i milliseklunder
export function fixDateTime(timeInMilli, type = "T"){

    const time = new Date(timeInMilli);
 
        
    const day = String(time.getDate()).padStart(2, '0');
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const year = time.getFullYear();
    const hour = String(time.getHours()).padStart(2, '0');
    const min = String(time.getMinutes()).padStart(2, '0');
    const sec = String(time.getSeconds()).padStart(2, '0');

    switch(type) {
        case "T": // bara datum
            return `${year}-${month}-${day}`;
        case "F": // full tid med datum
            return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
        case "H": // bara timmar och minuter
            return `${hour}:${min}`;
        default:
            return `${year}-${month}-${day}`;
    }


}