import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Popconfirm, Table, Switch } from 'antd';
import { setStats } from 'state';
import { v4 as uuidv4 } from 'uuid';






const EventsEditor = () => {
    const user = useSelector((state) => state.user);
    const randomEvents = useSelector((state) => state.user.randomEvents);
    const participants = useSelector((state) => state.user.participants);
    // { statName: "overness", label: "Major Overness Success", change: 5 },
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState(randomEvents);

    useEffect(() => {
        setDataSource(randomEvents);
      }, [randomEvents]);
  
 
      const handleDelete = (eventId) => {
        // console.log(eventId);
        // console.log(randomEvents);
        // console.log(dataSource);
        // Filter out the item with the specified id
        const newData = dataSource.filter((item) => item.eventId !== eventId);
      
        // Update the state with the new data
        dispatch(setStats({ randomEvents: newData }));
        setDataSource(newData);
      };
      


  const defaultColumns = [
    {
      title: 'Title',
      dataIndex: 'eventTitle',
      width: '70%',
      editable: true,
    },
{
      title: 'Operation',
      dataIndex: 'operation',
      width: '30%',

      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.eventId)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];


  

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  return (
    <div>
     
      <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="id" 
     
      />
    </div>
  );
};


export default EventsEditor;