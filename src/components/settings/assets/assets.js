import { settingsSchema } from './schemas';
import { parseSettingsToDB, parseSettingsFromDB } from './parsers';

const assets = {
    namespace: 'settings',
    schema: settingsSchema,
    parseToDB: parseSettingsToDB,
    parseFromDB: parseSettingsFromDB,
}

export default assets;