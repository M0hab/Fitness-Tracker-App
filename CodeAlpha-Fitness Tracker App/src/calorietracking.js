import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/calculate-calories', (req, res) => {
    const { pushups } = req.body;
    if (typeof pushups !== 'number' || pushups < 0) {
        return res.status(400).send({ error: 'Invalid number of pushups' });
    }
    const caloriesBurned = pushups * 0.32;
    res.send({ pushups, caloriesBurned });
});

app.post('/calculate-calories-situp', (req, res) => {
    const { situps } = req.body;
    if (typeof situps !== 'number' || situps < 0) {
        return res.status(400).send({ error: 'Invalid number of situps' });
    }
    const caloriesBurned = situps * 0.5;
    res.send({ situps, caloriesBurned });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});