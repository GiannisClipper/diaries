const convertFieldTo = ( field, type, onError ) => ( { 
    $convert: { 
        input: `$${ field }`,
        to: type,
        onError: onError || null 
    }
} )

const reduceField = ( field ) => ( {
    $reduce: {
        input: `$${ field }`,
        initialValue: "",
        in: { $concat : [ "$$value", "$$this" ] }
    }
} )

export {
    convertFieldTo,
    reduceField,
}