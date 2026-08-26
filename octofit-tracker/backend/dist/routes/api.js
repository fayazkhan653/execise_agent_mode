import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const router = Router();
router.get('/health', (_request, response) => response.json({ status: 'ok' }));
router.get('/users', async (_request, response, next) => {
    try {
        response.json(await User.find().sort({ points: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/users', async (request, response, next) => {
    try {
        response.status(201).json(await User.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams', async (_request, response, next) => {
    try {
        response.json(await Team.find().populate('members', 'name email'));
    }
    catch (error) {
        next(error);
    }
});
router.post('/teams', async (request, response, next) => {
    try {
        response.status(201).json(await Team.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities', async (request, response, next) => {
    try {
        const filter = request.query.user ? { user: request.query.user } : {};
        response.json(await Activity.find(filter).populate('user', 'name').sort({ loggedAt: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/activities', async (request, response, next) => {
    try {
        const activity = await Activity.create(request.body);
        await User.findByIdAndUpdate(activity.user, { $inc: { points: activity.points } });
        await Leaderboard.findOneAndUpdate({ user: activity.user }, { $inc: { points: activity.points } }, { upsert: true, new: true });
        response.status(201).json(await activity.populate('user', 'name'));
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard', async (_request, response, next) => {
    try {
        response.json(await User.find({}, 'name fitnessLevel points').sort({ points: -1 }).limit(100));
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts', async (request, response, next) => {
    try {
        const filter = request.query.fitnessLevel ? { fitnessLevel: request.query.fitnessLevel } : {};
        response.json(await Workout.find(filter).sort({ durationMinutes: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/workouts', async (request, response, next) => {
    try {
        response.status(201).json(await Workout.create(request.body));
    }
    catch (error) {
        next(error);
    }
});
router.use((error, _request, response, _next) => {
    const message = error instanceof Error ? error.message : 'Request failed';
    response.status(400).json({ error: message });
});
export default router;
