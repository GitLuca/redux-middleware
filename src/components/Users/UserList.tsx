import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getUsers } from "../../store/selectors";
import UserDisplay from "./UserDisplay";

export type UserListProps = PropsFromRedux;

export const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {users.map((user) => (
        <UserDisplay key={user.id} user={user} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserList);
