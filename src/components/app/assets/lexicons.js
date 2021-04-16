import coreLexicons from '../../core/assets/lexicons';
import diaryLexicons from '../../diary/assets/lexicons';
import benchLexicons from '../../bench/assets/lexicons';
import entryLexicons from '../../entry/assets/lexicons';
import noteLexicons from '../../note/assets/lexicons';
import paymentLexicons from '../../payment/assets/lexicons';
import paymentGenreLexicons from '../../payment_genre/assets/lexicons';
import paymentFundLexicons from '../../payment_fund/assets/lexicons';
import workoutLexicons from '../../workout/assets/lexicons';
import workoutGenreLexicons from '../../workout_genre/assets/lexicons';
import workoutEquipLexicons from '../../workout_equip/assets/lexicons';
import reportLexicons from '../../report/assets/lexicons';
import settingsLexicons from '../../settings/assets/lexicons';
import backupLexicons from '../../backup/assets/lexicons';
import signinLexicons from '../../signin/assets/lexicons';
import userLexicons from '../../user/assets/lexicons';

let EN = {
    language: 'EN',
    home: 'Home',
    core: coreLexicons.EN,
    diary: diaryLexicons.EN,
    bench: benchLexicons.EN,
    entry: entryLexicons.EN,
    note: noteLexicons.EN,
    payment: paymentLexicons.EN,
    paymentGenre: paymentGenreLexicons.EN,
    paymentFund: paymentFundLexicons.EN,
    workout: workoutLexicons.EN,
    workoutGenre: workoutGenreLexicons.EN,
    workoutEquip: workoutEquipLexicons.EN,
    report: reportLexicons.EN,
    settings: settingsLexicons.EN,
    backup: backupLexicons.EN,
    signin: signinLexicons.EN,
    user: userLexicons.EN,
}

let GR = {
    language: 'GR',
    home: 'Αρχική',
    core: coreLexicons.GR,
    diary: diaryLexicons.GR,
    bench: benchLexicons.GR,
    entry: entryLexicons.GR,
    note: noteLexicons.GR,
    payment: paymentLexicons.GR,
    paymentGenre: paymentGenreLexicons.GR,
    paymentFund: paymentFundLexicons.GR,
    workout: workoutLexicons.GR,
    workoutGenre: workoutGenreLexicons.GR,
    workoutEquip: workoutEquipLexicons.GR,
    report: reportLexicons.GR,
    settings: settingsLexicons.GR,
    backup: backupLexicons.GR,
    signin: signinLexicons.GR,
    user: userLexicons.GR,
}

const DEFAULT = EN;

export default { DEFAULT, EN, GR };
export { DEFAULT, EN, GR };
