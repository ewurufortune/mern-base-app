import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Popconfirm, Table, Switch } from 'antd';
import { setStats } from 'state';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
  
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
  
        // Additional validation for number inputs
        if (dataIndex === 'change' && isNaN(values[dataIndex])) {
          throw new Error(`${title} must be a number.`);
        }
  
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            type={dataIndex === 'change' ? 'number' : 'text'}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  


const ItemsEditor = () => {
    const user = useSelector((state) => state.user);
    const items = useSelector((state) => state.user.items);
    const participants = useSelector((state) => state.user.participants);
    // { statName: "overness", label: "Major Overness Success", change: 5 },
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState(items);
  const [count, setCount] = useState(items.length);

  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId);
    return participant ? participant.name : 'Vacant';
  };
 
  const handleDelete = (id) => {
    const newData = dataSource.filter(item => item.id !== id);
     dispatch(setStats({ items: newData }));
    setDataSource(newData);
  };


  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
        title: 'Style',
        dataIndex: 'style',
        width: '30%',
        editable: true,
      },
      {
        title: 'Current Holder',
        dataIndex: 'currentHolder',
        render: (_, record) => (
          <span>{getParticipantName(record.holderId[0])}</span>
        ),
      },

    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

 const handleAdd = () => {
  const newData = {
   
    id: count + 1,

        name: "Championship",
        style: " Champion",
        holderId: [],
        holderStartDate: Date(2023, 6, 10, 15, 30),
        holderEndDate: "Present",
        pastHolders: [
        
        ],
    
  };
  setDataSource([...dataSource, newData]);
  setCount(count + 1);
};

const handleSave = (row) => {
    const newData = dataSource.map(item => {
  
      if (item.id === row.id) {
        return {
          ...item,
          ...row,
        };
      }
      return item;
    });
    setDataSource(newData);
    console.log(newData);
     dispatch(setStats({ items: newData }));
  };
  
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
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
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
       Add A Stat
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="id" 
        expandable={{
    expandedRowRender: (record) => (
      <ul>
        {record.pastHolders.map((pastHolder, index) => (
          <li key={index}>
            <span>{getParticipantName(pastHolder.holderId)}</span>
            <span> (Start: {formatDate(pastHolder.startDate)}, End: {formatDate(pastHolder.endDate)})</span>
                      </li>
        ))}
      </ul>
    ),
    rowExpandable: (record) => record.pastHolders && record.pastHolders.length > 0,
  }}
      />
    </div>
  );
};

const formatDate = (date) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    //   timeZoneName: 'short',
    };
    return new Date(date).toLocaleString('en-US', options);
  };

const EditableBio = ({ initialBio, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [editedBio, setEditedBio] = useState(initialBio);
  
    const toggleEdit = () => {
      setEditing(!editing);
    };
  
    const handleBioChange = (e) => {
      setEditedBio(e.target.value);
    };
  
    const handleSaveBio = () => {
      onSave(editedBio);
      toggleEdit();
    };
  
    return (
      <div>
        <p>
          {editing ? (
            <Input
              value={editedBio}
              onChange={handleBioChange}
              onPressEnter={handleSaveBio}
              onBlur={handleSaveBio}
            />
          ) : (
            initialBio
          )}
        </p>
        <Button onClick={toggleEdit}>
          {editing ? 'Save' : 'Edit'}
        </Button>
      </div>
    );
  };
export default ItemsEditor;