import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Popconfirm, Table, Switch } from 'antd';
import StatsEditor from './StatsEditor';
import ParticipantEditor from './ParticipantEditor';
import { Collapse } from 'antd';
import Arcs from './Arcs'
import ItemsEditor from './Items';
import CategoriesEditor from './CategoriesEditor';
const items=[
    {
        key:1,
        label:'Participant Edit',
        children:  <ParticipantEditor />
    },
    {
        key:2,
        label:'Stats Edit',
        children:      <StatsEditor />

    },
    {
        key:3,
        label:'Arcs Edit',
        children:      <Arcs />

    },
    {
      key:4,
      label:'Items Edit',
      children:      <ItemsEditor />

  },
  {
    key:5,
    label:'Categories',
    children:      <CategoriesEditor />

},
]
export default function Editor() {
  return (
    <Collapse accordion items={items} />
  )
}
