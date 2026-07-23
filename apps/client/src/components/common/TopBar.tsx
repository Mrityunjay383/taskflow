import { TopBarProps } from "@/components/common/types";

const TopBar = ({ head, subhead }: TopBarProps) => {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{head}</h1>

            <p className="mt-2 text-sm text-slate-400">{subhead}</p>
        </div>
    );
};

export default TopBar;
