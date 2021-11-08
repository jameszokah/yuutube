import { SkeletonTheme } from "react-loading-skeleton";
import { useDarkTheme } from "../../context/ThemeContext";

const DarkSkeleton = ({ children }) => {
  const { state } = useDarkTheme();

  return (
    <>
      {state.darkMode ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          {children}
        </SkeletonTheme>
      ) : (
        children
      )}
    </>
  );
};

export default DarkSkeleton;
