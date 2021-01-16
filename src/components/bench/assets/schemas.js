const benchSchema = () => ( {
    diary_id: null,
    periods: [],
    _uiux: {
        status: {},  // isInitBefore, isInit
        mode: {},  // isInitStart, isInitPrev, isInitNext
        error: {},
    },
} );

export { benchSchema };
