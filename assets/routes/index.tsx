import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../../src/Loading";

const Login = lazy(() =>
  new Promise<{ default: React.FC }>((resolve) =>
    setTimeout(() => resolve(import("../../src/Components/Aut/Login")), 2000)
  )
);
const Register = lazy(() =>
  new Promise<{ default: React.FC }>((resolve) =>
    setTimeout(() => resolve(import("../../src/Components/Aut/Register")), 2000)
  )
);
const Boards = lazy(() =>
  new Promise<{ default: React.FC }>((resolve) =>
    setTimeout(() => resolve(import("../../src/pages/Boards/index")), 2000)
  )
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "boards",
    element: (
      <Suspense fallback={<Loading />}>
        <Boards />
      </Suspense>
    ),
  },
];

export default routes;
