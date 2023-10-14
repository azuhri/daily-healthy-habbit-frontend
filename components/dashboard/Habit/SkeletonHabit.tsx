import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonHabit = ({ props }: any) => {
  return (
    <ContentLoader
      viewBox="0 0 400 200"
      width="80% md:400"
      height="100 md:200"
      title="Loading news..."
      backgroundColor="#BFD5D8"
      foregroundColor="#EDEDED"
      {...props}
    >
      <rect x="42.84" y="9.93" rx="5" ry="5" width="143.55" height="86.59" />
      <rect x="192.84" y="9.67" rx="0" ry="0" width="200.72" height="12.12" />
      <rect x="192.84" y="30.67" rx="0" ry="0" width="200.72" height="12.12" />
      <rect x="192.84" y="50.67" rx="0" ry="0" width="200.72" height="12.12" />
      <rect x="192.84" y="70.67" rx="0" ry="0" width="89" height="9" />
    </ContentLoader>
  );
};

export default SkeletonHabit;
