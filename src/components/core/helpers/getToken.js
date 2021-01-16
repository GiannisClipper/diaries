const getToken = () => {
    const signin = JSON.parse( localStorage.getItem( 'signin' ) || '{}' );
    const { token } = signin;

    return token;
}

export default getToken;
export { getToken };