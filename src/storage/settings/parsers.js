const parseSettingsFromDB = ( data ) => ( {
    theme: data.theme,
    language: data.language,
} )

const parseSettingsToDB = ( data ) => ( {
    theme: data.theme,
    language: data.language,
} )

export { 
    parseSettingsFromDB,
    parseSettingsToDB,
};
