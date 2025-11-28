import { useState } from 'react';
import DailyHabitChart from './DailyHabitChart';
import MonthlyActivityGraph from './MonthlyActivityGraph';
import Navbar from './Navbar';
import CreateHabit from './CreateHabit';
import CreateGoal from './CreateGoal';
import GoalList from './GoalList';
import HabitLogging from './HabitLogging';
import './DashboardWrapper.css';

export default function DashboardWrapper({ role }) {
    const [refresh, setRefresh] = useState(false);

    return (
        <>
            <Navbar />
            <div className='dashboard'>
                <h2>Welcome, {role}</h2>

                <div className='habit-section'>
                    <CreateHabit onCreated={() => setRefresh(!refresh)} />
                    <HabitLogging onLogging={() => setRefresh(!refresh)} />
                </div>
                <div className='goal-section'>
                    <CreateGoal onCreated={() => setRefresh(!refresh)} />
                </div>

                <div className='goal-list'>
                    <GoalList key={refresh} />
                </div>
                <div className='daily-chart'>
                    <DailyHabitChart refresh={refresh} />
                </div>
                <div className='monthly-chart'>
                    <MonthlyActivityGraph refresh={refresh} />
                </div>
            </div>
        </>
    );
}