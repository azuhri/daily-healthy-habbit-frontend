type LoadingProps = {
  color?: string;
};

export default function Loading({ color }: LoadingProps) {
  let borderColor = "#fff";
  if (color == "black") borderColor = "#000";

  return (
    <>
      <div className="">
        <style global jsx>{`
          .loader {
            width: 28px;
            height: 28px;
            border: 3px solid ${borderColor};
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }

          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <span className="loader"></span>
      </div>
    </>
  );
}
