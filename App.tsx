
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import HydrationPacer from './components/HydrationPacer';
import MoodJournal from './components/MoodJournal';
import AlignmentCenter from './components/AlignmentCenter';
import { AppState, MoodEntry, Workout, HydrationLog, ExerciseDefinition, SplitDay, CycleConfig, Goal } from './types';
import { INITIAL_STATE } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('align_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('align_state', JSON.stringify(state));
  }, [state]);

  // Derived state for goals based on behavior
  const processedState = useMemo(() => {
    const newState = { ...state };
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    newState.goals = state.goals.map(goal => {
      let current = goal.current;
      
      if (goal.autoTrack === 'workouts' && goal.type === 'weekly') {
        current = state.workouts.filter(w => w.completed && new Date(w.date) >= oneWeekAgo).length;
      } else if (goal.autoTrack === 'hydration' && goal.type === 'weekly') {
        // Simple weekly sum for hydration
        current = state.hydration.filter(h => new Date(h.date) >= oneWeekAgo).reduce((acc, h) => acc + h.amountOz, 0);
      }

      return {
        ...goal,
        current,
        progress: Math.min(100, Math.floor((current / goal.target) * 100))
      };
    });

    return newState;
  }, [state]);

  const addHydration = (oz: number) => {
    const newLog: HydrationLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      amountOz: oz,
      timestamp: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      hydration: [...prev.hydration, newLog]
    }));
  };

  const updateHydrationGoal = (goal: number) => {
    setState(prev => ({
      ...prev,
      dailyHydrationGoal: goal
    }));
  };

  const addMood = (entry: Omit<MoodEntry, 'id' | 'date'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      moods: [...prev.moods, newEntry]
    }));
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'progress' | 'current'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      current: 0
    };
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const deleteGoal = (id: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id)
    }));
  };

  const updateWorkout = (workout: Workout) => {
    setState(prev => {
      const exists = prev.workouts.find(w => w.id === workout.id);
      const newWorkouts = exists 
        ? prev.workouts.map(w => w.id === workout.id ? workout : w)
        : [...prev.workouts, workout];

      return {
        ...prev,
        workouts: newWorkouts
      };
    });
  };

  const startNewWorkout = (name: string) => {
    const newWorkout: Workout = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      date: new Date().toISOString(),
      exercises: [],
      completed: false
    };
    setState(prev => ({
      ...prev,
      workouts: [...prev.workouts, newWorkout]
    }));
  };

  const updateSplit = (days: SplitDay[], templateId?: string) => {
    setState(prev => ({
      ...prev,
      weeklySplit: days,
      selectedTemplateId: templateId || prev.selectedTemplateId
    }));
  };

  const updateCycleConfig = (config: Partial<CycleConfig>) => {
    setState(prev => ({
      ...prev,
      cycleConfig: { ...prev.cycleConfig, ...config }
    }));
  };

  const handleNewExerciseCreated = (ex: ExerciseDefinition) => {
    setState(prev => ({
      ...prev,
      availableExercises: [...prev.availableExercises, ex]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard state={processedState} />;
      case 'workouts':
        const activeWorkout = processedState.workouts.find(w => !w.completed);
        const completedWorkouts = processedState.workouts.filter(w => w.completed).reverse();
        return (
          <WorkoutTracker 
            activeWorkout={activeWorkout} 
            completedWorkouts={completedWorkouts}
            onUpdate={updateWorkout} 
            onStart={startNewWorkout}
            availableExercises={processedState.availableExercises}
            onNewExerciseCreated={handleNewExerciseCreated}
            weeklySplit={processedState.weeklySplit}
            allHistory={processedState.workouts}
          />
        );
      case 'hydration':
        return (
          <HydrationPacer 
            logs={processedState.hydration}
            dailyGoal={processedState.dailyHydrationGoal}
            onAdd={addHydration} 
            onUpdateGoal={updateHydrationGoal}
          />
        );
      case 'mood':
        return <MoodJournal moods={processedState.moods} onAdd={addMood} />;
      case 'goals':
        return (
          <AlignmentCenter 
            state={processedState} 
            onUpdateSplit={updateSplit} 
            onUpdateCycle={updateCycleConfig}
            onAddGoal={addGoal}
            onDeleteGoal={deleteGoal}
          />
        );
      default:
        return <Dashboard state={processedState} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
