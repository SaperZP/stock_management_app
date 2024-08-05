import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
        <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{`${error.statusText} ${error.status}`}</i>
          </p>
          <button
              onClick={() => navigate("/")}
          >
            Go back to the home page
          </button>
        </div>
    );
  }

  return <p>{"Unknown Error"}</p>;
};

export default ErrorPage;
