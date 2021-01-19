import React from 'react'

import { User } from '../../types'

export type UserDisplayProps = {user: User}

export const UserDisplay = ({user}: UserDisplayProps) => {
    return (
        <div>
            <h3>{user.name} {user.username}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
        </div>
    )
}

export default UserDisplay