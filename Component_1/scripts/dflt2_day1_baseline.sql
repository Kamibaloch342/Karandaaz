-- DFLT Phase II Day-1 baseline (Table 1 and footnote 1 of Component 1).
-- Run read-only against bisp_dflt2.db:  sqlite3 -readonly -line bisp_dflt2.db < dflt2_day1_baseline.sql
-- Day-1 teaching-form counts are matched to registrations at the same duty station and date; where both trainers
-- of a pair submitted a form, the higher count is used. Sessions with fewer than 5 registrations, or with any count
-- above the number registered, and registrations of terminated trainers are excluded.
WITH t AS (
  SELECT TRIM(duty_station) AS ds, date(starttime) AS d,
         COALESCE(MAX(CAST(num_can_read_write AS INT)),0)           AS rw,
         COALESCE(MAX(CAST(num_recognize_currency AS INT)),0)       AS cur,
         COALESCE(MAX(CAST(num_simple_math AS INT)),0)              AS math,
         COALESCE(MAX(CAST(num_use_calculator AS INT)),0)           AS calc,
         COALESCE(MAX(CAST(num_have_digital_wallet AS INT)),0)      AS wal,
         COALESCE(MAX(CAST(num_used_wallet_transactions AS INT)),0) AS walt,
         COALESCE(MAX(CAST(num_have_bank_account AS INT)),0)        AS bank,
         COALESCE(MAX(CAST(num_have_saving_committee AS INT)),0)    AS sav,
         COALESCE(MAX(CAST(num_can_withdraw_atm AS INT)),0)         AS atm
  FROM aspc_teaching_form WHERE training_day = 'day1' GROUP BY 1, 2),
r AS (
  SELECT TRIM(duty_station) AS ds, date(starttime) AS d, COUNT(*) AS n
  FROM bene_registration WHERE province <> 'Terminated' GROUP BY 1, 2),
j AS (SELECT t.*, r.n FROM t JOIN r ON r.ds = t.ds AND r.d = t.d),
ok AS (SELECT * FROM j WHERE n >= 5 AND MAX(rw,cur,math,calc,wal,walt,bank,sav,atm) <= n AND MIN(rw,cur,math,calc,wal,walt,bank,sav,atm) >= 0)
SELECT (SELECT COUNT(*) FROM t) AS day1_sessions, (SELECT COUNT(*) FROM j) AS matched_to_registrations,
       COUNT(*) AS sessions_kept, SUM(n) AS women_covered,
       ROUND(100.0*SUM(rw)/SUM(n),1)   AS pct_can_read_write,
       ROUND(100.0*SUM(cur)/SUM(n),1)  AS pct_recognise_currency,
       ROUND(100.0*SUM(math)/SUM(n),1) AS pct_simple_math,
       ROUND(100.0*SUM(calc)/SUM(n),1) AS pct_use_calculator,
       ROUND(100.0*SUM(wal)/SUM(n),1)  AS pct_have_digital_wallet,
       ROUND(100.0*SUM(walt)/SUM(n),1) AS pct_used_wallet_transaction,
       ROUND(100.0*SUM(bank)/SUM(n),1) AS pct_have_bank_account,
       ROUND(100.0*SUM(sav)/SUM(n),1)  AS pct_saving_committee,
       ROUND(100.0*SUM(atm)/SUM(n),1)  AS pct_can_withdraw_atm
FROM ok;
