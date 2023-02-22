export class InvalidKeyPressError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidKeyPressError';
    }
}