/**
 * Created by Vitaliy on 03.10.2016.
 */

import { Groups } from '../../../Common/Consts'
import { Link } from 'react-router'

import React from 'react'

export function GroupFilter() {
  return (
    <div>
      {Groups.map((group) => <Link to={`/products/group/${group.url}`} key={group.url}>{group.name}</Link>)}
    </div>
  )
}

export default GroupFilter

