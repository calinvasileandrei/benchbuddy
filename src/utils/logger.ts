const isLogEnabled = true // Config.IS_LOG_ENABLED === 'true';

function _isObject(obj?: any) {
    return obj && obj === Object(obj)
}

export class Logger {
    private readonly loggerName: string

    constructor(loggerName: string) {
        this.loggerName = loggerName
    }

    /* tslint:disable:no-console */
    public debug(text: string, payload?: any) {
        if (isLogEnabled) {
            if (payload) {
                text =
                    text +
                    ' ' +
                    (_isObject(payload) ? JSON.stringify(payload, null, '\t') : payload)
            }
            console.log(this.loggerName + ': ' + text)
        }
    }

    /* tslint:disable:no-console */
    public error(text: string, error: any) {
        if (isLogEnabled) {
            let errorMSg = this.loggerName + ': ' + text + ' '
            if (_isObject(error)) {
                errorMSg += JSON.stringify(error, null, '\t')
            } else if (error?.message) {
                errorMSg += error.message
            } else {
                errorMSg += error
            }
            console.warn(new Error(errorMSg))
        }
    }
}
