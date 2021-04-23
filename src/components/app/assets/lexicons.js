import coreLexicons from '../../core/assets/lexicons';
import diariesLexicons from '../../diaries/assets/lexicons';
import benchLexicons from '../../bench/assets/lexicons';
import entriesLexicons from '../../entries/assets/lexicons';
import notesLexicons from '../../notes/assets/lexicons';
import paymentsLexicons from '../../payments/assets/lexicons';
import payment_genresLexicons from '../../payment_genres/assets/lexicons';
import payment_fundsLexicons from '../../payment_funds/assets/lexicons';
import workoutsLexicons from '../../workouts/assets/lexicons';
import workout_genresLexicons from '../../workout_genres/assets/lexicons';
import workout_equipsLexicons from '../../workout_equips/assets/lexicons';
import reportsLexicons from '../../reports/assets/lexicons';
import settingsLexicons from '../../settings/assets/lexicons';
import backupLexicons from '../../backup/assets/lexicons';
import signinLexicons from '../../signin/assets/lexicons';
import usersLexicons from '../../users/assets/lexicons';

let EN = {
    language: 'EN',
    home: 'Home',
    core: coreLexicons.EN,
    diaries: diariesLexicons.EN,
    bench: benchLexicons.EN,
    entries: entriesLexicons.EN,
    notes: notesLexicons.EN,
    payments: paymentsLexicons.EN,
    payment_genres: payment_genresLexicons.EN,
    payment_funds: payment_fundsLexicons.EN,
    workouts: workoutsLexicons.EN,
    workout_genres: workout_genresLexicons.EN,
    workout_equips: workout_equipsLexicons.EN,
    reports: reportsLexicons.EN,
    settings: settingsLexicons.EN,
    backup: backupLexicons.EN,
    signin: signinLexicons.EN,
    users: usersLexicons.EN,
}

let GR = {
    language: 'GR',
    home: 'Αρχική',
    core: coreLexicons.GR,
    diaries: diariesLexicons.GR,
    bench: benchLexicons.GR,
    entries: entriesLexicons.GR,
    notes: notesLexicons.GR,
    payments: paymentsLexicons.GR,
    payment_genres: payment_genresLexicons.GR,
    payment_funds: payment_fundsLexicons.GR,
    workouts: workoutsLexicons.GR,
    workout_genres: workout_genresLexicons.GR,
    workout_equips: workout_equipsLexicons.GR,
    reports: reportsLexicons.GR,
    settings: settingsLexicons.GR,
    backup: backupLexicons.GR,
    signin: signinLexicons.GR,
    users: usersLexicons.GR,
}

const DEFAULT = EN;

export default { DEFAULT, EN, GR };
export { DEFAULT, EN, GR };
