import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/features/tasks/task.api";

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
};
