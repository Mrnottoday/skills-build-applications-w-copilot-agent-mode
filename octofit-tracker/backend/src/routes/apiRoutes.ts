import { Router } from 'express';

import getApiBaseUrl from '../config/apiBaseUrl';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofitModels';

const router = Router();

router.get('/', (_req, res) => {
  const apiBaseUrl = getApiBaseUrl();

  res.status(200).json({
    service: 'octofit-backend',
    apiBaseUrl,
    endpoints: {
      users: `${apiBaseUrl}/api/users/`,
      teams: `${apiBaseUrl}/api/teams/`,
      activities: `${apiBaseUrl}/api/activities/`,
      leaderboard: `${apiBaseUrl}/api/leaderboard/`,
      workouts: `${apiBaseUrl}/api/workouts/`,
    },
  });
});

router.get('/users/', async (_req, res) => {
  const users = await User.find().lean();

  res.status(200).json(users);
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();

  res.status(200).json(teams);
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();

  res.status(200).json(activities);
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();

  res.status(200).json(leaderboard);
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean();

  res.status(200).json(workouts);
});

export default router;