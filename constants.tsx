
import React from 'react';
import { AppState, Goal, Workout, ExerciseDefinition, SplitDay, SplitTemplate, EquipmentType } from './types';

export const COMMON_EXERCISES: ExerciseDefinition[] = [
  // Chest
  { name: 'Bench Press', category: 'Chest' },
  { name: 'Incline Dumbbell Press', category: 'Chest' },
  { name: 'Chest Fly', category: 'Chest' },
  { name: 'Push Ups', category: 'Chest' },
  { name: 'Dips', category: 'Chest' },
  { name: 'Cable Crossover', category: 'Chest' },
  { name: 'Decline Press', category: 'Chest' },
  { name: 'Pec Deck', category: 'Chest' },
  
  // Back
  { name: 'Pull Ups', category: 'Back' },
  { name: 'Lat Pulldown', category: 'Back' },
  { name: 'Bent Over Row', category: 'Back' },
  { name: 'Deadlift', category: 'Back' },
  { name: 'Seated Cable Row', category: 'Back' },
  { name: 'Single Arm Dumbbell Row', category: 'Back' },
  { name: 'T-Bar Row', category: 'Back' },
  { name: 'Face Pulls', category: 'Back' },
  { name: 'Back Extension', category: 'Back' },
  { name: 'Chin Ups', category: 'Back' },
  
  // Shoulders
  { name: 'Overhead Press', category: 'Shoulders' },
  { name: 'Lateral Raise', category: 'Shoulders' },
  { name: 'Front Raise', category: 'Shoulders' },
  { name: 'Rear Delt Fly', category: 'Shoulders' },
  { name: 'Arnold Press', category: 'Shoulders' },
  { name: 'Upright Row', category: 'Shoulders' },
  { name: 'Shrugs', category: 'Shoulders' },
  
  // Legs
  { name: 'Squat', category: 'Legs' },
  { name: 'Leg Press', category: 'Legs' },
  { name: 'Leg Curl', category: 'Legs' },
  { name: 'Leg Extension', category: 'Legs' },
  { name: 'Lunge', category: 'Legs' },
  { name: 'Bulgarian Split Squat', category: 'Legs' },
  { name: 'Romanian Deadlift', category: 'Legs' },
  { name: 'Calf Raise', category: 'Legs' },
  { name: 'Hack Squat', category: 'Legs' },
  { name: 'Glute Bridge', category: 'Legs' },
  { name: 'Hip Thrust', category: 'Legs' },
  
  // Arms
  { name: 'Bicep Curl', category: 'Arms' },
  { name: 'Tricep Extension', category: 'Arms' },
  { name: 'Hammer Curl', category: 'Arms' },
  { name: 'Preacher Curl', category: 'Arms' },
  { name: 'Skull Crushers', category: 'Arms' },
  { name: 'Tricep Pushdown', category: 'Arms' },
  { name: 'Concentration Curl', category: 'Arms' },
  { name: 'Close Grip Bench Press', category: 'Arms' },
  
  // Core
  { name: 'Plank', category: 'Core' },
  { name: 'Hanging Leg Raise', category: 'Core' },
  { name: 'Crunch', category: 'Core' },
  { name: 'Russian Twist', category: 'Core' },
  { name: 'Dead Bug', category: 'Core' },
  { name: 'Mountain Climbers', category: 'Core' },
  { name: 'Ab Wheel Rollout', category: 'Core' },
  { name: 'Woodchopper', category: 'Core' },
  
  // Cardio
  { name: 'Running', category: 'Cardio' },
  { name: 'Cycling', category: 'Cardio' },
  { name: 'Swimming', category: 'Cardio' },
  { name: 'Walking', category: 'Cardio' },
  { name: 'Elliptical', category: 'Cardio' },
  { name: 'Rowing Machine', category: 'Cardio' },
  { name: 'Jump Rope', category: 'Cardio' },
  { name: 'Stair Climber', category: 'Cardio' },
  
  // Active Recovery
  { name: 'Yoga', category: 'Active Recovery' },
  { name: 'Stretching', category: 'Active Recovery' },
  { name: 'Foam Rolling', category: 'Active Recovery' },
  { name: 'Pilates', category: 'Active Recovery' },
  { name: 'Mobility Flow', category: 'Active Recovery' }
];

export const EQUIPMENT_CONFIG: Record<EquipmentType, { label: string; icon: string }> = {
  bodyweight: { label: 'Bodyweight', icon: '👤' },
  dumbbell: { label: 'Dumbbell', icon: '⚵' },
  barbell: { label: 'Barbell', icon: '🏋️' },
  cable: { label: 'Cable', icon: '⛓️' },
  kettlebell: { label: 'Kettlebell', icon: '🔔' },
  machine: { label: 'Machine', icon: '⚙️' }
};

export const SPLIT_TEMPLATES: SplitTemplate[] = [
  {
    id: 'ppl-6',
    name: 'Push / Pull / Legs',
    description: 'The gold standard for muscle growth. 6 days per week.',
    days: [
      { day: 'Mon', label: 'Push' },
      { day: 'Tue', label: 'Pull' },
      { day: 'Wed', label: 'Legs' },
      { day: 'Thu', label: 'Push' },
      { day: 'Fri', label: 'Pull' },
      { day: 'Sat', label: 'Legs' },
      { day: 'Sun', label: 'Rest' }
    ]
  },
  {
    id: 'ul-4',
    name: 'Upper / Lower',
    description: 'Great balance of recovery and intensity. 4 days per week.',
    days: [
      { day: 'Mon', label: 'Upper' },
      { day: 'Tue', label: 'Lower' },
      { day: 'Wed', label: 'Rest' },
      { day: 'Thu', label: 'Upper' },
      { day: 'Fri', label: 'Lower' },
      { day: 'Sat', label: 'Rest' },
      { day: 'Sun', label: 'Rest' }
    ]
  },
  {
    id: 'fb-3',
    name: 'Full Body Focus',
    description: 'Ideal for busy schedules. 3 heavy days per week.',
    days: [
      { day: 'Mon', label: 'Full Body' },
      { day: 'Tue', label: 'Rest' },
      { day: 'Wed', label: 'Full Body' },
      { day: 'Thu', label: 'Rest' },
      { day: 'Fri', label: 'Full Body' },
      { day: 'Sat', label: 'Rest' },
      { day: 'Sun', label: 'Rest' }
    ]
  },
  {
    id: 'athlete-5',
    name: 'Performance Split',
    description: 'Mixed modality for general athleticism. 5 days per week.',
    days: [
      { day: 'Mon', label: 'Strength' },
      { day: 'Tue', label: 'Mobility' },
      { day: 'Wed', label: 'Condition' },
      { day: 'Thu', label: 'Strength' },
      { day: 'Fri', label: 'Endurance' },
      { day: 'Sat', label: 'Rest' },
      { day: 'Sun', label: 'Rest' }
    ]
  }
];

export const INITIAL_STATE: AppState = {
  workouts: [],
  goals: [
    { id: 'g3', title: 'Strength Training Momentum', type: 'weekly', progress: 0, target: 4, current: 0, unit: 'workouts', autoTrack: 'workouts' }
  ],
  moods: [],
  hydration: [],
  cycle: [],
  cycleConfig: {
    lastStartDate: new Date().toISOString().split('T')[0],
    cycleLength: 28
  },
  availableExercises: COMMON_EXERCISES,
  weeklySplit: SPLIT_TEMPLATES[0].days,
  selectedTemplateId: 'ppl-6',
  dailyHydrationGoal: 64
};

export const MOOD_CONFIG: Record<string, { emoji: string; color: string }> = {
  calm: { emoji: '🌿', color: 'bg-emerald-50' },
  energized: { emoji: '⚡', color: 'bg-amber-50' },
  tired: { emoji: '☁️', color: 'bg-blue-50' },
  anxious: { emoji: '🌊', color: 'bg-indigo-50' },
  neutral: { emoji: '✨', color: 'bg-stone-50' },
  happy: { emoji: '☀️', color: 'bg-yellow-50' }
};

export const COLORS = {
  primary: '#7c9082', // Sage Green
  secondary: '#a4b1a8',
  accent: '#d4a373', // Muted Gold/Brown
  background: '#fcfbf7', // Warm Cream
  card: '#ffffff'
};
