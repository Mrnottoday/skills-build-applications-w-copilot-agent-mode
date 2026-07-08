"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const octofitModels_1 = require("../models/octofitModels");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            octofitModels_1.Activity.deleteMany({}),
            octofitModels_1.LeaderboardEntry.deleteMany({}),
            octofitModels_1.Team.deleteMany({}),
            octofitModels_1.User.deleteMany({}),
            octofitModels_1.Workout.deleteMany({}),
        ]);
        const users = await octofitModels_1.User.insertMany([
            {
                name: 'Mona Patel',
                email: 'mona.patel@example.com',
                age: 29,
                team: 'Trail Blazers',
            },
            {
                name: 'Jordan Lee',
                email: 'jordan.lee@example.com',
                age: 34,
                team: 'Trail Blazers',
            },
            {
                name: 'Avery Johnson',
                email: 'avery.johnson@example.com',
                age: 26,
                team: 'Core Crushers',
            },
            {
                name: 'Sam Rivera',
                email: 'sam.rivera@example.com',
                age: 31,
                team: 'Core Crushers',
            },
            {
                name: 'Priya Chen',
                email: 'priya.chen@example.com',
                age: 38,
                team: 'Velocity Squad',
            },
        ]);
        await octofitModels_1.Team.insertMany([
            {
                name: 'Trail Blazers',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Core Crushers',
                members: [users[2]._id, users[3]._id],
            },
            {
                name: 'Velocity Squad',
                members: [users[4]._id],
            },
        ]);
        await octofitModels_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Trail Run',
                durationMinutes: 52,
                date: new Date('2026-07-01T06:30:00.000Z'),
            },
            {
                user: users[1]._id,
                type: 'Cycling',
                durationMinutes: 75,
                date: new Date('2026-07-02T12:15:00.000Z'),
            },
            {
                user: users[2]._id,
                type: 'Strength Training',
                durationMinutes: 45,
                date: new Date('2026-07-03T17:45:00.000Z'),
            },
            {
                user: users[3]._id,
                type: 'Yoga Flow',
                durationMinutes: 40,
                date: new Date('2026-07-04T07:00:00.000Z'),
            },
            {
                user: users[4]._id,
                type: 'Interval Rowing',
                durationMinutes: 35,
                date: new Date('2026-07-05T18:20:00.000Z'),
            },
        ]);
        await octofitModels_1.LeaderboardEntry.insertMany([
            {
                user: users[1]._id,
                score: 980,
                rank: 1,
            },
            {
                user: users[4]._id,
                score: 940,
                rank: 2,
            },
            {
                user: users[0]._id,
                score: 910,
                rank: 3,
            },
            {
                user: users[2]._id,
                score: 875,
                rank: 4,
            },
            {
                user: users[3]._id,
                score: 830,
                rank: 5,
            },
        ]);
        await octofitModels_1.Workout.insertMany([
            {
                name: 'Morning Mobility Reset',
                description: 'A low-impact warmup that improves hip, spine, and shoulder range of motion.',
                difficulty: 'Beginner',
                durationMinutes: 20,
            },
            {
                name: 'Tempo 5K Builder',
                description: 'Steady tempo intervals designed to build aerobic endurance for runners.',
                difficulty: 'Intermediate',
                durationMinutes: 38,
            },
            {
                name: 'Full-Body Strength Circuit',
                description: 'Compound strength movements with short recovery windows for balanced power.',
                difficulty: 'Intermediate',
                durationMinutes: 45,
            },
            {
                name: 'Rowing Sprint Ladder',
                description: 'Progressive rowing sprints with active recovery for conditioning.',
                difficulty: 'Advanced',
                durationMinutes: 32,
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
