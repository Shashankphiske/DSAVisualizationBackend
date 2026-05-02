import { createLogger, format, transports, addColors } from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

addColors(colors);

const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    levels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.printf(({ timestamp, level, message, ...meta }) => {
                    const { timestamp: _, ...cleanMeta } = meta;
                    return `${timestamp} [${level}]: ${message} ${Object.keys(cleanMeta).length ? JSON.stringify(cleanMeta) : ''
                        }`;
                })
            ),
        }),
    ],
});


export { logger };
