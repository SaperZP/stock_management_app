import {Outlet} from "react-router-dom";

const PrivateLayout = () => {
  return (
      <div>
        PrivateLayout
        <Outlet />
      </div>
  );
};

export default PrivateLayout;
