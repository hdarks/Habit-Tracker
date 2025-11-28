import React, { useEffect, useState } from "react";
import './GoalList.css';
import api from "../api";

export default function GoalList() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            const res = await api.get('/goals/your-goals');
            setGoals(res.data);
        };
        fetchGoals();
    }, []);

    return (
        <div className="goal-list">
            <h3>Your Goals</h3>

            {goals.length === 0 && <p>No Goals listed.</p>}

            {goals.map((goal) => (
                <div key={goal._id} className="goal-item">
                    <h4>{goal.title}</h4>
                    <p>Deadline: {goal.deadline ? new Date(goal.deadline).toDateString() : "None"}</p>

                    <strong>Habits:</strong>
                    <ul>
                        {goal.targetHabits.map((habit) => (
                            <li key={habit._id}>{habit.name}</li>
                        ))}
                    </ul>

                    <p>Status: {goal.achieved ? "✅ Achieved" : "⌛ In Progress"}</p>
                </div>
            ))}
        </div>
    );
};