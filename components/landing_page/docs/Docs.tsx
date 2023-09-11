import Circle from "../components/Circle"
import LeftAppRightText from "./LeftAppRightText"
import RightAppLeftText from "./RightAppLeftText"

export default function Docs() {
    return (
        <div className="flex pb-[300px] md:px-32  flex-col bg-white relative" id="HowToUseSection">
            <p className="text-4xl text-ds-blue-100 text-center font-bold">HOW TO USE APP ?</p>
            <LeftAppRightText />
            <RightAppLeftText />
            <LeftAppRightText />
        </div>
    )
}