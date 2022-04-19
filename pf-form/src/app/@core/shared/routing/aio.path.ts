export enum COMPONENT_AIO {
    MODULE = 'aio',

    START = 'identity', // 登入身分

    MAIN = 'main', // 首頁

    CASH_DEPOSIT_SETTING = 'deposit_setting', // 存款

    CASH_DEPOSIT_COUNTER_TRADER = 'deposit_counter_trader', // 臨櫃交易人

    CASH_DEPOSIT_CONFIRM = 'deposit_confirm', // 存款 confirm

    CASH_WITHDRAW_SETTING = 'withdraw_setting', // 提款

    CASH_WITHDRAW_CONFIRM = 'withdraw_confirm', // 存款 confirm

    INTRA_BANK_SETTING = 'intra_bank_setting', // 本行轉帳

    INTRA_BANK_CONFIRM = 'intra_bank_confirm', // 本行轉帳 confirm

    INTER_BANK_SETTING = 'inter_bank', // 他行匯款

    INTER_BANK_2 = 'inter_bank_2', // 他行匯款

    INTER_BANK_CONFIRM = 'inter_bank_confirm', // 他行匯款 confirm

    FINISH = 'finish', // 完成

    USER = 'user', // 使用者資訊

    SHORTURL = 'shorturl', // 短網址產生器

    VIOLATION = 'Violation',//違規者資訊
}
