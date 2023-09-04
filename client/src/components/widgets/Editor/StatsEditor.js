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
  


const StatsEditor = () => {
    const user = useSelector((state) => state.user);
    const stats = useSelector((state) => state.user.stats);
    // { statName: "overness", label: "Major Overness Success", change: 5 },
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState(stats);
  const [count, setCount] = useState(stats.length);

 
  const handleDelete = (id) => {
    const newData = dataSource.filter(item => item.id !== id);
    setDataSource(newData);
     dispatch(setStats({ stats: newData }));
  };


  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'statName',
      width: '30%',
      editable: true,
    },
    {
        title: 'Label',
        dataIndex: 'label',
        width: '30%',
        editable: true,
      },
      {
        title: 'Stat Change',
        dataIndex: 'change',
        width: '30%',
        editable: true,
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
    statName: `overness`,
    isActive: true, // Set the initial value to true
    bio: 'What does it mean?',
    labed:'Minor Increase',
    change: 5,
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
     dispatch(setStats({ stats: newData }));
    console.log(newData);
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
      <EditableBio
        initialBio={record.bio}
        onSave={(editedBio) => handleSave({ ...record, bio: editedBio })}
      />
    ),
    rowExpandable: (record) => record.name !== 'Not Expandable',
  }}
      />
    </div>
  );
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
export default StatsEditor;