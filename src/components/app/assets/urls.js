const base = '/.netlify/functions';

const urls = {
    users: 'users',
    signin: 'signin',
    settings: 'settings',
    backup: `backup`,

    diaries: 'diaries',
    entries: 'entries',
    payment_funds: 'payment_funds',
    payment_genres: 'payment_genres',
    workout_equips: 'workout_equips',
    workout_genres: 'workout_genres',
    reports: 'reports',
};

Object.keys( urls ).forEach( key => urls[ key ] = `${ base }/${ urls[ key ] }` );

export default urls;
export { urls };