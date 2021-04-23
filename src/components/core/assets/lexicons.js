import { isInvalid } from "../../../lambda/core/validators";

const EN = {
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    menu: 'Options',
    create: 'Create new',
    retrieve: 'Retrieve',
    update: 'Update',
    delete: 'Delete',
    ok: 'Ok',
    cancel: 'Cancel',
    cut: 'Cut',
    copy: 'Copy',
    paste: 'Paste',
    close: 'Close',
    isBlank: 'Empty value not allowed.',
    isFound: 'Value already exists.',
    isNotFound: 'Value not valid.',

    isEmpty: 'Empty value not allowed.',
    isInvalid: 'Value not valid.',
    isExists: 'Value already exists.',
    isNotExists: 'Value not exists.',
    isUsedBy: 'Document is used.',
}

const GR = {
    days: [
        "Κυριακή",
        "Δευτέρα",
        "Τρίτη",
        "Τετάρτη",
        "Πέμπτη",
        "Παρασκευή",
        "Σάββατο"
    ],
    months: [
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
    ],
    menu: 'Επιλογές',
    create: 'Νέα καταχώρηση',
    retrieve: 'Ανάκτηση',
    update: 'Τροποποίηση',
    delete: 'Διαγραφή',
    ok: 'Ok',
    cancel: 'Άκυρο',
    cut: 'Αποκοπή',
    copy: 'Αντιγραφή',
    paste: 'Επικόλληση',
    close: 'Κλείσιμο',
    isBlank: 'Η τιμή δεν μπορεί να είναι κενή.',
    isFound: 'Η τιμή υπάρχει ήδη.',
    isNotFound: 'Η τιμή δεν είναι έγκυρη.',

    isEmpty: 'Η τιμή δεν μπορεί να είναι κενή.',
    isInvalid: 'Η τιμή δεν είναι έγκυρη.',
    isExists: 'Η τιμή υπάρχει ήδη.',
    isNotExists: 'Η τιμή δεν βρέθηκε.',
    isUsedBy: 'Η εγγραφή χρησιμοποιείται.',
}

export default { EN, GR };
export { EN, GR };
