const HabitItem = () => {
  return (
    <div className="flex rounded-full w-full bg-white h-28">
      <div className="w-1/5 h-full bg-blue-500 rounded-l-lg"></div>
      <div className="w-4/5 h-full bg-white rounded-r-lg text-black py-2 px-2">
        <h1 className="font-bold">Nama Habit</h1>
        <div className="flex space-x-2 text-xs">
          <p>• 5:00 AM</p>
          <p>• Saat ini: 8</p>
        </div>
        <p className="pt-3 text-xs line-clamp-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam a,
          nemo quisquam sit similique ipsum distinctio quo, dolorem non quia
          ducimus eum voluptate aliquam dicta mollitia totam fugit commodi
          impedit facere consectetur modi, tempore voluptatem laudantium.
          Consequatur consequuntur eaque laborum ad aperiam tempore,
          necessitatibus nulla incidunt quasi sequi, quod hic aliquid voluptas,
          eveniet odio reprehenderit. Ipsum fugit doloribus, voluptatibus dolore
          rem est beatae sit quis iure labore earum. Dolor ad, obcaecati
          perspiciatis, eius dolore ipsam nesciunt, nihil consequuntur
          asperiores cum atque in debitis praesentium accusantium? Temporibus
          quasi quidem sequi vero quo? Repellat soluta nam, cum animi assumenda
          quod nihil illum?
        </p>
      </div>
    </div>
  );
};
export default HabitItem;
