"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiBaseUrl_1 = __importDefault(require("../config/apiBaseUrl"));
const octofitModels_1 = require("../models/octofitModels");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    const apiBaseUrl = (0, apiBaseUrl_1.default)();
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
    const users = await octofitModels_1.User.find().lean();
    res.status(200).json(users);
});
router.get('/teams/', async (_req, res) => {
    const teams = await octofitModels_1.Team.find().populate('members').lean();
    res.status(200).json(teams);
});
router.get('/activities/', async (_req, res) => {
    const activities = await octofitModels_1.Activity.find().populate('user').lean();
    res.status(200).json(activities);
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await octofitModels_1.LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();
    res.status(200).json(leaderboard);
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await octofitModels_1.Workout.find().lean();
    res.status(200).json(workouts);
});
exports.default = router;
