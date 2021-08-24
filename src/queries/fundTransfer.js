/**
 * find transfer by pin
 */
const findTransferByPin =`
SELECT id, currency, account_number, amount, pin, created_at FROM fundTransfer WHERE pin=$1
`;

/**
 * find transfer by id
 */
const findTransferById =`
SELECT id, currency, account_number, amount, pin, created_at FROM fundTransfer WHERE id=$1
`;

/**
 * Add transfer
 */
const addTransferQuery =`
INSERT INTO 
    fundTransfer(
        currency,
        account_number,
        amount,
        pin
    )
    VALUES ($1,$2,$3,$4) RETURNING id, currency, account_number, amount, pin, created_at, updated_at
`;

module.exports = {
    findTransferById,
    findTransferByPin,
    addTransferQuery
}