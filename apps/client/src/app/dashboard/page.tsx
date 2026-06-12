"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { useTasks } from "@/features/tasks/task.queries";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const { data: tasksData, isLoading, error } = useTasks();

    // if (isLoading) return <Loading />;
    // if (error) return <ErrorMessage />;
    if (!tasksData) return null;

    return (
        <>
            {tasksData.tasks.map((task) => (
                <div>task.name</div>
            ))}
        </>
    );
}
