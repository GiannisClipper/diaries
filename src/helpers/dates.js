const daysBetween = ( fromDate, tillDate ) => {
    const diff = ( tillDate.getTime() - fromDate.getTime() );
    return Math.round( diff / ( 24 * 60 * 60 * 1000 ) );  // (1day = 24h * 60min * 60sec * 1000msec)
};

const shiftDate = ( date, days ) => {
    let newDate = new Date( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );  // (1day = 24h * 60min * 60sec * 1000msec)

    // Adjust `newDate` considering the starting or ending of the Daylight Saving Time.
    const timezoneDiff = date.getTimezoneOffset() - newDate.getTimezoneOffset();

    if ( timezoneDiff !== 0 ) {
        newDate = new Date( newDate.getTime() - timezoneDiff * 60 * 1000 );    
    };

    return newDate;
}

const dayNames = [
    "Κυριακή",
    "Δευτέρα",
    "Τρίτη",
    "Τετάρτη",
    "Πέμπτη",
    "Παρασκευή",
    "Σάββατο"
];

const monthNames = [
    "Ιανουάριος",
    "Φεβρουάριος",
    "Μάρτιος",
    "Απρίλιος",
    "Μάιος",
    "Ιούνιος",
    "Ιούλιος",
    "Αύγουστος",
    "Σεπτέμβριος",
    "Οκτώβριος",
    "Νοέμβριος",
    "Δεκέμβριος"
];

export { daysBetween, shiftDate, dayNames, monthNames };