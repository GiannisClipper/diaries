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

    isEmpty: 'Empty not allowed.',
    isInvalid: 'Not valid.',
    isExists: 'Already exists.',
    isNotExists: 'Not exists.',
    isUsedBy: 'Is in use.',
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

    isEmpty: 'Δεν μπορεί να είναι κενό.',
    isInvalid: 'Μη έγκυρο.',
    isExists: 'Υπάρχει ήδη.',
    isNotExists: 'Δεν υπάρχει.',
    isUsedBy: 'Είναι σε χρήση.',
}

export default { EN, GR };
export { EN, GR };
