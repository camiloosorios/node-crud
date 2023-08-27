export class PurchaseValidateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PurchaseValidateError';
    }
}
