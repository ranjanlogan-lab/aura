export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rpe: number; // Rate of Perceived Exertion (1-10)
  restSeconds: number;
  notes?: string; // e.g., "Weak Point exercise choice"
}

export interface WorkoutDay {
  dayIndex: number; // 0 (Sunday) .. 6 (Saturday)
  dayName: string; // e.g., "Day 1: Pull (Lat Focused) + Weak Point"
  exercises: Exercise[];
}

export interface WorkoutProgram {
  weeks: number; // how many weeks to repeat the 7-day split
  days: WorkoutDay[]; // 7 entries
}