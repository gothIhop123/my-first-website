CREATE TABLE IF NOT EXISTS case_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case1 INTEGER,
    case2 INTEGER,
    case3 INTEGER,
    case4 INTEGER,
    case5 INTEGER,
    case6 INTEGER,
    case2_or_5 INTEGER,
    case3_or_4 INTEGER,
    d20cases TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);