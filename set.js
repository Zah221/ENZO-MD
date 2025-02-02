const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0c3V2h5ZzNFYjByaDh3bGFuRFYyVmM5REhlRWQrRThzbnp4TEtjM2huOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL3prdFRXRDJCNmR1T3kvaGkxM09maExja2lqUU9CYUNmOFlPU2xKajRRND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RlpEay8zVFUxSEp1U05SRUdTMjNVY1pWSzRvdHNsbFMyWjZNNytWd0d3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIalJZWjYyQ3UzQlc4YlA1UFhzeUE3MmprMVFCdDhjZ3hhd1NwY2xjNVUwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtBVTZ6NjRZTUQ2SUozQ0Fwd1J4Rmx5NStlUEhzLzJLd2FEQWxJcDdFMkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBzWnRFdjFROGZ4aElaTmdvYml2S29uZU1kYnFReUFOR09IenhaNWhHUWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ZFWXFCQ1RhR0FxVzBOQzRaakZ4dmJDdUNGT3RjaFZhZEc5UCtxUjVHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0ZETHYvWDFER1E2bGFOejJwS2FmQTcyN0NqMmVlcEZ3Smg0T0ZnTEFnZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InAwUiswZDRqcEExaktQc0YrK21pazNmMmtMbysxY2NOa2o0Y1FqUmJyWGRDMXdmU2RIcUtpbEZwanRIVXVOalNZQXFRVnBTeUh4Y2NNY0dIZ1Yvd0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA5LCJhZHZTZWNyZXRLZXkiOiJQVGdjWmluWWJxNjd4c05IYmtKMkVudVYrQkVUWkxBVnBLWi9FNmJQb2dNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnbHlxSWRoOVNSeXB6clNaNVMyalZ3IiwicGhvbmVJZCI6IjNmOTE5ZjczLThjZTktNGEyMC1hNmE1LTEwZmI2MTU0ZjJjZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwQ3I0S3Vnd1lvaTA3Tmh6aStuNTY5NTJnZVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWdDQ0xleFQ2a291WGtoTS9WSWhvSmg5SkNRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjIzRTRTTVM4IiwibWUiOnsiaWQiOiIyNTY3NTgxMDMxMzA6ODFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0luZS9JVUhFSnpTLzd3R0dCRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZ3ekVZUzMzNllCQ3o5aGNBMER6eHFlQkJ3dmV5NmU1amlMQXJpK2tTMWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IitHV24xQ3ZsK1k2QXp6WWIzZWxpWG9iUjc5UXlvQnFSQVBWTFhuVktRTkhzMStoWDVidHk3TFVGaGZoaXdSWXJMSEVCYzNQWjAxOUxpR2h0VGV4YkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOM25VK1ZoYTVDa3BzTFFsYjJQdjhlUjVHeC9LbHA1aEk5NVFvTGNjQ1NvZTlXM0NMSUhHZ09sOStoM0xJK2tva2FIemVFZDJQdThNNFREMXhOajBDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc1ODEwMzEzMDo4MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWY014R0V0OSttQVFzL1lYQU5BODhhbmdRY0wzc3VudVk0aXdLNHZwRXRaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4NTMzMTYyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "mr pickup lines",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " mr pickup lines",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
