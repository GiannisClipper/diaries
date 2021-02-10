const withLexicon = ( func, lexicon ) => {
    return ( ...args ) => func( lexicon, ...args );
}

export default withLexicon;
export { withLexicon };