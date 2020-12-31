const parseSettingsFromDB = ( data ) => ( {
    theme: data.theme,
} )

const parseSettingsToDB = ( data ) => ( {
    theme: data.theme,
} )

export { 
    parseSettingsFromDB,
    parseSettingsToDB,
};
