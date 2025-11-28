import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from "../api";

export default function DailyHabitChart({ refresh }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTodayHabits = async () => {
            try {
                // const month = new Date().getMonth();
                // const year = new Date().getFullYear();
                const res = await api.get(`/habits`);

                const habits = Array.isArray(res.data) ? res.data : [];
                const today = new Date().toDateString();

                const todayData = habits.map(habit => {
                    const log = habit.logs?.find(l => new Date(l.date).toDateString() === today);
                    return {
                        name: habit.name,
                        completed: log?.completed ? 1 : 0
                    };
                });
                setData(todayData || []);
            } catch (err) {
                console.error('Error loading daily habits', err);
                setData([]);
            }
        };
        fetchTodayHabits();
    }, [refresh]);

    return (
        <div className="chart-container">
            <h3>Today's Habits</h3>
            {data.length === 0 ? (
                <p className="empty-state">No Habits yet. Create one to start tracking progress.</p>
            ) : (
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey='completed' fill='#82ca9d' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}