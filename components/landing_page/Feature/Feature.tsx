import ListFeature from "./ListFeature";

export default function Feature() {
  return (
    <div className="bg-white py-[200px] px-32" id="FeatureSection">
      <p className="text-4xl text-ds-blue-100 text-center font-bold">
        FITUR
      </p>
      <div className="flex my-20 grid grid-cols-4">
         <ListFeature />
         <ListFeature />
         <ListFeature />
         <ListFeature />
      </div>
    </div>
  );
}
