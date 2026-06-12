import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/task.api";

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });
};
