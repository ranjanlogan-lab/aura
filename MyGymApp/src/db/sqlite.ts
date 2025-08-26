import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('mygymapp.db');

export async function initializeDatabase(): Promise<void> {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS workout_logs (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,
      exercise TEXT NOT NULL,
      setNumber INTEGER NOT NULL,
      reps INTEGER NOT NULL,
      weight REAL,
      UNIQUE(date, exercise, setNumber)
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS workout_sessions (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL UNIQUE,
      dayIndex INTEGER NOT NULL,
      complete INTEGER NOT NULL DEFAULT 0
    );`
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS day_notes (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT NOT NULL UNIQUE,
      note TEXT
    );`
  );
}

export async function logSet(
  dateISO: string,
  exercise: string,
  setNumber: number,
  reps: number,
  weight?: number
): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO workout_logs (date, exercise, setNumber, reps, weight)
     VALUES (?, ?, ?, ?, ?);`,
    [dateISO, exercise, setNumber, reps, weight ?? null]
  );
}

export async function markSessionComplete(dateISO: string, dayIndex: number): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO workout_sessions (date, dayIndex, complete)
     VALUES (?, ?, 1);`,
    [dateISO, dayIndex]
  );
}

export async function saveDayNote(dateISO: string, note: string): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO day_notes (date, note) VALUES (?, ?);`,
    [dateISO, note]
  );
}

export async function getWeeklyVolume(startISO: string, endISO: string): Promise<Array<{ date: string; volume: number }>> {
  return await db.getAllAsync(
    `SELECT date, SUM(reps * COALESCE(weight, 0)) as volume
     FROM workout_logs
     WHERE date BETWEEN ? AND ?
     GROUP BY date
     ORDER BY date ASC;`,
    [startISO, endISO]
  );
}

export async function getPersonalRecords(): Promise<Array<{ exercise: string; maxWeight: number }>> {
  return await db.getAllAsync(
    `SELECT exercise, MAX(COALESCE(weight, 0)) as maxWeight
     FROM workout_logs
     GROUP BY exercise
     ORDER BY exercise ASC;`,
    []
  );
}

export async function getConsistency(): Promise<Array<{ date: string; complete: number }>> {
  return await db.getAllAsync(
    `SELECT date, complete FROM workout_sessions ORDER BY date ASC;`,
    []
  );
}