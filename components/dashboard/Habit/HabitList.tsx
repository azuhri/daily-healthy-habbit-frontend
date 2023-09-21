import HabitItem from "./HabitItem";

const HabitList = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <HabitItem />
      <HabitItem />
      <HabitItem />
      <HabitItem />
    </div>
  );
};

export default HabitList;
