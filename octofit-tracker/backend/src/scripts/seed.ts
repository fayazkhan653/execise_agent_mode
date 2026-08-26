import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan] = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', fitnessLevel: 'intermediate', points: 120 },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com', fitnessLevel: 'beginner', points: 85 },
    ]);

    await Team.create({
      name: 'OctoFit Trailblazers',
      description: 'A friendly team focused on consistent movement.',
      members: [maya._id, jordan._id],
    });

    await Activity.create([
      { user: maya._id, type: 'running', durationMinutes: 30, distanceKm: 4.2, points: 120 },
      { user: jordan._id, type: 'walking', durationMinutes: 25, distanceKm: 2.1, points: 85 },
    ]);

    await Leaderboard.create([
      { user: maya._id, points: 120 },
      { user: jordan._id, points: 85 },
    ]);

    await Workout.create([
      { title: 'Steady Start Walk', description: 'A comfortable walk to build a daily habit.', fitnessLevel: 'beginner', durationMinutes: 20, activityType: 'walking' },
      { title: 'Tempo Run', description: 'Alternate a challenging pace with easy recovery.', fitnessLevel: 'intermediate', durationMinutes: 30, activityType: 'running' },
      { title: 'Full Body Strength', description: 'A balanced bodyweight circuit for advanced athletes.', fitnessLevel: 'advanced', durationMinutes: 35, activityType: 'strength' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
