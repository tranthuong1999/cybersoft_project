import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CACHED_URL } from '../../constants/localStorage';
import path from '../../constants/clientPath';
import { isHavingToken } from '../../utils/localStorage';

type IRouteProps = {
  component: React.FC;
  location?: {
    pathname: string;
  };
  path: string;
};

const ProtectedRoute = ({
  component: Component,
  location,
  ...rest
}: IRouteProps) => {
  const isLoggedIn = isHavingToken();
  /**
   *  Navigate to desired path after logging in
   */
  if (!isLoggedIn) {
    // const { location } = rest;
    localStorage.setItem(CACHED_URL, location.pathname);
  }

  const cachedUrl = localStorage.getItem(CACHED_URL);

  return (
    <Route
      {...rest}
      render={(props: undefined) => {
        /**
         *  For common navigation in app
         */
        if (isLoggedIn && !cachedUrl) {
          return <Component {...props} />;
        }
        /**
         *  For navigation to cached path RIGHT after logging in
         */
        if (isLoggedIn && cachedUrl) {
          // remove the cached path (if it exists) after achieve it for navigating purpose
          localStorage.removeItem(CACHED_URL);
          return <Redirect to={{ pathname: cachedUrl }} />;
        }
        /**
         *  If not logined yet
         */
        return (
          <Redirect
            to={{
              pathname: path.LOGIN,
            }}
          />
        );
      }}
    />
  );
};

ProtectedRoute.defaultProps = {
  location: {
    pathname: '/',
  },
};

export default ProtectedRoute;
