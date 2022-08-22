export class Helper {
    static getErrorMessage(message: string[] | string | undefined, defaultMessage?: string) {
        if (!message)
            return defaultMessage || 'Something went wrong, please try again!';
        if (Array.isArray(message))
            return message.join(",")
        return message;
    }
}