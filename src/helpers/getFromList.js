const getFromList = ( list, field, value ) => {
    const result = list.filter( x => x[ field ] === value );
    return result.length > 0 ? result[ 0 ] : {};
}

export default getFromList;
export { getFromList };