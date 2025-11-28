import React, { useEffect, useState } from "react";
import './CreateGoal.css';
import api from "../api";

export default function CreateGoal({ onCreated }) {
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [habits, setHabits] = useState([]);
    const [selectedHabits, setSelectedHabits] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get('/habits');
                setHabits(res.data);
            } catch (err) {
                console.error("Failed to load Habits", err);
            }
        };
        fetchHabits();
    }, []);

    const toggleHabit = (habitId) => {
        setSelectedHabits((prev) => prev.includes(habitId) ? prev.filter((id) => id !== habitId) : [...prev, habitId]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/goals/create', {
                title,
                deadline,
                targetHabits: selectedHabits
            });

            onCreated && onCreated(res.data);
            setTitle("");
            setDeadline("");
            setSelectedHabits([]);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create goal");
        }
    };

    return (
        <div className="goal-form">
            <h3>Create Goal</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Goal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <h4>Select Habits</h4>
                <div className="habit-list">
                    {habits.length === 0 && <p>No habits yet. Create on first!!!</p>}

                    {habits.map((habit) => (
                        <label key={habit._id} className="habit-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedHabits.includes(habit._id)}
                                onChange={(e) => toggleHabit(habit._id)}
                            />
                            {habit.name}
                        </label>
                    ))}
                </div>

                <button type="submit">Create Goal</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};