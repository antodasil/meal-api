import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

function level(): string {
    return process.env.NODE_ENV === 'development' ? 'debug' : 'warn';
}

// Couleurs utilisés dans les logs
// winston.addColors({
//     error: 'red',
//     warn: 'yellow',
//     info: 'white',
//     http: 'magenta',
//     debug: 'green'
// });

const format = winston.format.combine(
    winston.format.timestamp({format: 'DD/MM/YYYY HH:mm:ss:ms'}),
    // winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
    )
)

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports: process.env.NODE_ENV === 'development'
        ? new winston.transports.Console()
        : new winston.transports.File({filename: 'log/debug.log'})
});

export default Logger;