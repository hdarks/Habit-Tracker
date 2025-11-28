import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import './MonthlyActivityGraph.css';
import api from "../api";

export default function MonthlyActivityGraph({ refresh }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMonthlySummary = async () => {
            try {
                const month = new Date().getMonth();
                const year = new Date().getFullYear();
                const res = await api.get(`/habits/summary?month=${month}&year=${year}`);

                const dailyMap = {};

                res.data.forEach(habit => {
                    habit.logs?.forEach((log) => {
                        const dateStr = new Date(log.date).toLocaleDateString();
                        if (!dailyMap[dateStr]) dailyMap[dateStr] = 0;
                        if (log.completed) dailyMap[dateStr]++;
                    });
                });

                const formatted = Object.entries(dailyMap).map(([date, count]) => ({
                    date,
                    completedCount: count
                }));
                setData(formatted);
            } catch (err) {
                console.error('Error fetching monthly summary', err);
                setData([]);
            }
        };
        fetchMonthlySummary();
    }, [refresh]);

    return (
        <div className="chart-container">
            <h3>Monthly Activity</h3>
            {(!data || data.length === 0) ? (
                <p className="empty-state">No activity yet. Log your habits to see progress.</p>
            ) : (
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="completedCount" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}