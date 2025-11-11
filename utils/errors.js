"use strict";

module.exports = {
    unknownError: {
        status: 0,
        statusCode: "UNKNOWN_ERROR",
        message: "Something went wrong",
    },
    unAuthorized: {
        status: -1,
        statusCode: "UNAUTHORIZED",
        message: "Unauthorized",
        httpErrorCode: 401,
    },
    userNotFound: {
        status: -2,
        statusCode: "USER_NOT_FOUND",
        message: "User not found",
        httpErrorCode: 401,
    },
    userAlreadyExists: {
        status: -3,
        statusCode: "USER_ALREADY_EXISTS",
        message: "User already exists",
    },
    invalidPassword: {
        status: -4,
        statusCode: "INVALID_PASSWORD",
        message: "Invalid password",
        httpErrorCode: 401,
    },
    invalidEmail: {
        status: -5,
        statusCode: "INVALID_EMAIL",
        message: "Invalid email",
    },
    invalidUsername: {
        status: -6,
        statusCode: "INVALID_USERNAME",
        message: "Invalid username",
    },
    invalidName: {
        status: -7,
        statusCode: "INVALID_NAME",
        message: "Invalid name",
    },
    invalidRole: {
        status: -8,
        statusCode: "INVALID_ROLE",
        message: "Invalid role",
    },
    invalidCurrency: {
        status: -9,
        statusCode: "INVALID_CURRENCY",
        message: "Invalid currency",
    },
    insufficientBalance: {
        status: -10,
        statusCode: "INSUFFICIENT_BALANCE",
        message: "Insufficient balance",
    },
    invalidAmount: {
        status: -11,
        statusCode: "INVALID_AMOUNT",
        message: "Invalid amount",
    },
    invalidPrice: {
        status: -12,
        statusCode: "INVALID_PRICE",
        message: "Invalid price",
    },
    invalidType: {
        status: -13,
        statusCode: "INVALID_TYPE",
        message: "Invalid type",
    },
    tooManyRequests: {
        status: -14,
        statusCode: "TOO_MANY_REQUESTS",
        message: "Too many requests",
        httpErrorCode: 429,
    },
    requestAlreadyInProcess: {
        status: -15,
        statusCode: "REQUEST_ALREADY_IN_PROCESS",
        message: "Request already in process",
    },
    invalidCredentials: {
        status: -16,
        statusCode: "INVALID CREDENTIALS",
        message: "invalid credentials",
    },
    invalidSignature: {
        status: -17,
        statusCode: "INVALID_SIGNATURE",
        message: "Invalid signature",
    },
    projectNotFound: {
        status: -18,
        statusCode: "PROJECT_NOT_FOUND",
        message: "Project not found",
    },
    ProjectDoesNotExist: {
        status: -17,
        statusCode: "PROJECT_DOES_NOT_EXIST",
        message: "project does not exist",
    },
    botNotFound: {
        status: -19,
        statusCode: "BOT_NOT_FOUND",
        message: "Bot not found",
    },
    botAlreadyRunning: {
        status: -20,
        statusCode: "BOT_ALREADY_RUNNING",
        message: "Bot already running",
    },
    botEditFailed: {
        status: -21,
        statusCode: "BOT_EDIT_FAILED",
        message: "Bot edit failed",
    },
    botResponseNotSaved: {
        status: -22,
        statusCode: "BOT_RESPONSE_NOT_SAVED",
        message: "Bot response not saved",
    },
    chainNotFound: {
        status: -23,
        statusCode: "CHAIN_NOT_FOUND",
        message: "Chain not found",
    },
    walletAlreadyExists: {
        status: -24,
        statusCode: "WALLET_ALREADY_EXISTS",
        message: "Wallet already exists",
    },
    notFound: {
        status: -25,
        statusCode: "NOT_FOUND",
        message: "Not found",
    },
    invalidSellPercentage: {
        status: -26,
        statusCode: "INVALID_SELL_PERCENTAGE",
        message: "Invalid sell percentage",
    },
    invalidRouter: {
        status: -27,
        statusCode: "INVALID_ROUTER",
        message: "Invalid router",
    },
    invalidToken: {
        status: -28,
        statusCode: "INVALID_TOKEN",
        message: "Invalid token",
    },
    walletNotFound: {
        status: -29,
        statusCode: "WALLET_NOT_FOUND",
        message: "Wallet not found",
    },
    invalidPresaleAddress: {
        status: -30,
        statusCode: "INVALID_PRESALE_ADDRESS",
        message: "Invalid presale address",
    },
    invalidReferralCode: {
        status: -31,
        statusCode: "INVALID_REFERRAL_CODE",
        message: "Invalid referral code",
    },
    noWallet: {
        status: -32,
        statusCode: "NO_WALLET",
        message: "You must have at least one wallet",
    },
    botAlreadyActive: {
        status: -33,
        statusCode: "BOT_ALREADY_ACTIVE",
        message: "Bot already active",
    },
    walletAlreadyInUse: {
        status: -34,
        statusCode: "WALLET_ALREADY_IN_USE",
        message: "Wallet already in use",
    },
    amountNotSet: {
        status: -35,
        statusCode: "AMOUNT_NOT_SET",
        message: "Amount not set",
    },
    gasPriceNotSet: {
        status: -36,
        statusCode: "GAS_PRICE_NOT_SET",
        message: "Gas price not set",
    },
    maxWalletLimitReached: {
        status: -37,
        statusCode: "MAX_WALLET_LIMIT_REACHED",
        message: "Max wallet limit reached",
    },
    maxSniperLimitReached: {
        status: -38,
        statusCode: "MAX_SNIPER_LIMIT_REACHED",
        message: "Max sniper limit reached",
    },
    maxFrontRunnerLimitReached: {
        status: -39,
        statusCode: "MAX_FRONTRUNNER_LIMIT_REACHED",
        message: "Max front runner limit reached",
    },
    maxPresaleLimitReached: {
        status: -40,
        statusCode: "MAX_PRESALE_LIMIT_REACHED",
        message: "Max presale limit reached",
    },
    maxCopytradeLimitReached: {
        status: -41,
        statusCode: "MAX_COPYTRADE_LIMIT_REACHED",
        message: "Max copytrade limit reached",
    },
    maxPendingOrdersLimitReached: {
        status: -42,
        statusCode: "MAX_PENDING_ORDERS_LIMIT_REACHED",
        message: "Max pending orders limit reached",
    },
    referralCodeAlreadyAdded: {
        status: -43,
        statusCode: "REFERRAL_CODE_ALREADY_ADDED",
        message: "Referral code already added",
    },
    selfReferralCode: {
        status: -44,
        statusCode: "SELF_REFERRAL_CODE",
        message: "You cannot add your own referral code",
    },
    transactionFailed: {
        status: -45,
        statusCode: "TRANSACTION_FAILED",
        message: "Transaction failed",
    },
    transactionNotFound: {
        status: -46,
        statusCode: "TRANSACTION_NOT_FOUND",
        message: "Transaction not found",
    },
    duplicateTransaction: {
        status: -47,
        statusCode: "DUPLICATE_TRANSACTION",
        message: "Duplicate transaction",
    },
    noLockIn: {
        status: -32,
        statusCode: "NO_LOCK_IN",
        message: "You must have at least one plan locked",
    },
    userNotConsentedToShareWallets: {
        status: -47,
        statusCode: "USER_NOT_CONSENTED_TO_SHARE_WALLETS",
        message: "User not consented to share wallets",
    },
    invalidRequest: {
        status: -48,
        statusCode: "INVALID_REQUEST",
        message: "Invalid request",
    },
    insufficientAmountOut: {
        status: -49,
        statusCode: "INSUFFICIENT_AMOUNT_OUT",
        message: "Insufficient amount out",
    },
    insufficientAmountIn: {
        status: -50,
        statusCode: "INSUFFICIENT_AMOUNT_IN",
        message: "Insufficient amount in",
    },
    insufficientMAGHolding: {
        status: -51,
        statusCode: "INSUFFICIENT_MAG_HOLDING",
        message: "Insufficient MAG Holding",
    },
    insufficientClaimableAmount: {
        status: -52,
        statusCode: "INSUFFICIENT_CLAIMABLE_AMOUNT",
        message: "Insufficient claimable amount",
    },
    amountTooSmall: {
        status: -53,
        statusCode: "AMOUNT_TOO_SMALL",
        message: "Amount too small",
    },
    amountTooLarge: {
        status: -54,
        statusCode: "AMOUNT_TOO_LARGE",
        message: "Amount too large",
    },
    mfHardCapReached: {
        status: -55,
        statusCode: "MF_HARD_CAP_REACHED",
        message: "Mutual Fund hard cap reached",
    },
    tokenNotApprovedForTrading: {
        status: -56,
        statusCode: "TOKEN_NOT_APPROVED_FOR_TRADING",
        message: "Token not approved for trading",
    },
    poolInactive: {
        status: -57,
        statusCode: "POOL_INACTIVE",
        message: "Pool is inactive",
    },
    newDepositsDisabled: {
        status: -58,
        statusCode: "NEW_DEPOSITS_DISABLED",
        message: "New deposits are disabled",
    },
    migrationInvalid: {
        status: -59,
        statusCode: "MIGRATION_INVALID",
        message: "Migration is invalid",
    },
    watchListWalletAlreadyExists: {
        status: -60,
        statusCode: "WATCHLIST_WALLET_ALREADY_EXISTS",
        message: "Watchlist wallet already exists",
    },
    insufficientCrossChainBalance: {
        status: -61,
        statusCode: "INSUFFICIENT_CROSS_CHAIN_BALANCE",
        message: "Insufficient balance in cross chain wallet",
    },
    insufficientTeamBalance: {
        status: -62,
        statusCode: "INSUFFICIENT_TEAM_BALANCE",
        message: "Insufficient balance in team wallet",
    },
    watchListWalletLimitExceed: {
        status: -63,
        statusCode: "WATCHLIST_WALLET_LIMIT_EXCEED",
        message: "Watchlist wallet Limit Exceed",
    },
    strategyNotFound: {
        status: -64,
        statusCode: "STRATEGY_NOT_FOUND",
        message: "Strategy not found",
    },
};
