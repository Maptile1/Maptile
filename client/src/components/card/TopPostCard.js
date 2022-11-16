import { React} from "react";

const TopPostCard = (props) => {
    return <div className={`bg-maptile-background-light w-2/5 h-full rounded-3xl z-30 overflow-hidden relative`}>{props.name}</div>;
};

export default TopPostCard;
