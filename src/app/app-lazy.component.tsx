import { lazy } from "react";

export const UsersComponent = lazy(() =>
  import("@components/users/users.component").then(({ UsersComponent }) => ({
    default: UsersComponent,
  })),
);

export const UserDetailsComponent = lazy(() =>
  import("@components/user-details/user-details.component").then(
    ({ UserDetailsComponent }) => ({ default: UserDetailsComponent }),
  ),
);
