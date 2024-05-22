-- Custom SQL migration file, put you code below! --
-- https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-LEVENSHTEIN
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch CASCADE;