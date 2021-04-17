const base = '/.netlify/functions';

const urls = {
    user: 'user',
    signin: 'signin',
    settings: 'settings',
    backup: `backup`,

    diary: 'diary',
    entry: 'entry',
    payment_fund: 'payment_fund',
    payment_genre: 'payment_genre',
    workout_equip: 'workout_equip',
    workout_genre: 'workout_genre',
    report: 'report',
};

Object.keys( urls ).forEach( key => urls[ key ] = `${ base }/${ urls[ key ] }` );

export default urls;
export { urls };