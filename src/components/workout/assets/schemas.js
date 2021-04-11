const workoutSchema = () => ( {
    type: 'workout',
    type_specs: {
        genre_id: '',
        duration: null,
        distance: null,
        remark: '',
        equip_id: ''
    }
} );

export { workoutSchema };
