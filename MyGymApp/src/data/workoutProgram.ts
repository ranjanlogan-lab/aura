import { WorkoutProgram } from '../types/workout';

export const workoutProgram: WorkoutProgram = {
  weeks: 4,
  days: [
    {
      dayIndex: 0,
      dayName: 'Day 1: Pull (Lat Focused) + Weak Point',
      exercises: [
        { name: 'Deadlift', sets: 3, reps: 5, rpe: 8, restSeconds: 180 },
        { name: 'Pull-Up', sets: 4, reps: 8, rpe: 7, restSeconds: 120 },
        { name: 'Lat Pulldown', sets: 3, reps: 10, rpe: 7, restSeconds: 90 },
        { name: 'Seated Row', sets: 3, reps: 12, rpe: 7, restSeconds: 90 },
        { name: 'Face Pull', sets: 3, reps: 15, rpe: 6, restSeconds: 60 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    },
    {
      dayIndex: 1,
      dayName: 'Day 2: Push (Chest/Triceps) + Weak Point',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 6, rpe: 8, restSeconds: 150 },
        { name: 'Incline DB Press', sets: 3, reps: 10, rpe: 7, restSeconds: 120 },
        { name: 'Dips', sets: 3, reps: 10, rpe: 8, restSeconds: 120 },
        { name: 'Lateral Raise', sets: 4, reps: 12, rpe: 6, restSeconds: 60 },
        { name: 'Triceps Pushdown', sets: 3, reps: 12, rpe: 7, restSeconds: 75 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    },
    {
      dayIndex: 2,
      dayName: 'Day 3: Legs (Quad Focused) + Weak Point',
      exercises: [
        { name: 'Back Squat', sets: 4, reps: 5, rpe: 8, restSeconds: 180 },
        { name: 'Leg Press', sets: 3, reps: 10, rpe: 7, restSeconds: 120 },
        { name: 'Walking Lunges', sets: 3, reps: 12, rpe: 7, restSeconds: 90 },
        { name: 'Leg Extension', sets: 3, reps: 15, rpe: 6, restSeconds: 60 },
        { name: 'Calf Raise', sets: 4, reps: 12, rpe: 7, restSeconds: 60 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    },
    {
      dayIndex: 3,
      dayName: 'Day 4: Upper (Shoulder/Back) + Weak Point',
      exercises: [
        { name: 'Overhead Press', sets: 4, reps: 6, rpe: 8, restSeconds: 150 },
        { name: 'Chest Supported Row', sets: 3, reps: 10, rpe: 7, restSeconds: 120 },
        { name: 'Arnold Press', sets: 3, reps: 10, rpe: 7, restSeconds: 90 },
        { name: 'Rear Delt Fly', sets: 3, reps: 15, rpe: 6, restSeconds: 60 },
        { name: 'Cable Row', sets: 3, reps: 12, rpe: 7, restSeconds: 90 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    },
    {
      dayIndex: 4,
      dayName: 'Day 5: Pull (Trap/Rear Delt Focused) + Weak Point',
      exercises: [
        { name: 'Barbell Row', sets: 4, reps: 8, rpe: 8, restSeconds: 150 },
        { name: 'Lat Pulldown', sets: 3, reps: 10, rpe: 7, restSeconds: 120 },
        { name: 'Face Pull', sets: 3, reps: 15, rpe: 6, restSeconds: 60 },
        { name: 'Shrugs', sets: 4, reps: 10, rpe: 7, restSeconds: 90 },
        { name: 'Biceps Curl', sets: 3, reps: 12, rpe: 7, restSeconds: 60 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    },
    {
      dayIndex: 5,
      dayName: 'Day 6: Legs (Hamstring/Glute Focused) + Weak Point',
      exercises: [
        { name: 'Romanian Deadlift', sets: 4, reps: 8, rpe: 8, restSeconds: 150 },
        { name: 'Hip Thrust', sets: 3, reps: 10, rpe: 7, restSeconds: 120 },
        { name: 'Leg Curl', sets: 3, reps: 12, rpe: 7, restSeconds: 90 },
        { name: 'Bulgarian Split Squat', sets: 3, reps: 10, rpe: 8, restSeconds: 120 },
        { name: 'Calf Raise', sets: 4, reps: 12, rpe: 7, restSeconds: 60 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    },
    {
      dayIndex: 6,
      dayName: 'Day 7: Push (Shoulder/Chest) + Weak Point',
      exercises: [
        { name: 'Incline Bench Press', sets: 4, reps: 6, rpe: 8, restSeconds: 150 },
        { name: 'Machine Chest Press', sets: 3, reps: 10, rpe: 7, restSeconds: 120 },
        { name: 'Lateral Raise', sets: 4, reps: 12, rpe: 6, restSeconds: 60 },
        { name: 'Cable Fly', sets: 3, reps: 12, rpe: 7, restSeconds: 75 },
        { name: 'Triceps Extension', sets: 3, reps: 12, rpe: 7, restSeconds: 75 },
        { name: 'Weak Point', sets: 3, reps: 12, rpe: 8, restSeconds: 90, notes: 'Weak Point exercise choice' }
      ]
    }
  ]
};