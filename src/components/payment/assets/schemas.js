const paymentSchema = () => ( {
    type: 'payment',
    type_specs: {
        genre_id: '',
        revenue: null,
        expense: null,
        remark: '',
        fund_id: '',
    }
} );

export { paymentSchema };
