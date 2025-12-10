CREATE TABLE chances(
    extID INTEGER NOT NULL PRIMARY KEY, --unique ID for each cases
    description TEXT NOT NULL, --description on how to trigger the case
    Chance TEXT NOT NULL --chances for each case to happen 
    --Frequency INTEGER NOT NULL --how many times it happened for you
);
