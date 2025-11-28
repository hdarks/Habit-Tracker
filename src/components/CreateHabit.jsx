import React, { useState } from "react";
import './CreateHabit.css';
import api from "../api";

export default function CreateHabit({ onCreated }) {
    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState("daily");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/habits/create', {
                name, frequency
            });
            onCreated && onCreated(res.data);
            setName("");
            setFrequency("daily");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create Habit");
        }
    };

    return (
        <div className="habit-form">
            <h3>Create a Habit</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Habit Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
                <button type="submit">Add Habit</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}