import React, { useEffect, useState } from "react";
import './HabitLogging.css';
import api from "../api";

export default function HabitLogging({ onLogging }) {
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get('/habits');
                setHabits(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to Fetch Habits");
            }
        };
        fetchHabits();
    }, []);

    const toggleHabit = async (habitId, completed) => {
        try {
            const today = new Date();
            await api.put(`/habits/${habitId}/log`, {
                date: today,
                completed
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to Log Habit");
        }
    };

    return (
        <div className="habit-logging">
            <h3>Log Today's Habits</h3>
            {habits.length === 0 && <p>No Habits yet. Create one first !!!</p>}
            {habits.map((habit) => (
                <label key={habit._id} className="habit-log-item">
                    <input type="checkbox"
                        onChange={(e) => toggleHabit(habit._id, e.target.checked)} />
                    {habit.name}
                </label>
            ))}
            {error && <p className="error">{error}</p>}
        </div>
    );
};