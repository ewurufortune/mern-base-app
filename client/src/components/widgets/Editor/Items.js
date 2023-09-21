import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStats } from "state";
import _ from "lodash";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Switch,
  Select,
  Collapse,
} from "antd";
import { v4 as uuidv4 } from "uuid";

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
    if (editing && inputRef.current) {
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
      if (dataIndex === "change" && isNaN(values[dataIndex])) {
        throw new Error(`${title} must be a number.`);
      }

      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
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
        {/* Render Input only when editing */}
        {dataIndex === "holderId" ? (
          children // Keep the Select as it is
        ) : (
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            type={dataIndex === "change" ? "number" : "text"}
          />
        )}
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
  const dispatch = useDispatch();
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const [dataSource, setDataSource] = useState(items);
  const [count, setCount] = useState(items.length);

  const handleParticipantChange = (record, filteredSelectedParticipants) => {
    // Spread the filteredSelectedParticipants into the record.participants array
    const updatedRecord = {
      ...record,
      holderId: [...filteredSelectedParticipants],
    };

    const clonedCategories = _.cloneDeep(items);
    const categoryIndex = clonedCategories.findIndex(
      (category) => category.id === updatedRecord.id
    );

    if (categoryIndex !== -1) {
      clonedCategories[categoryIndex] = updatedRecord;
    }
    console.log(updatedRecord);
    dispatch(setStats({ items: clonedCategories }));
    setSelectedParticipants(updatedRecord);
  };

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
    dispatch(setStats({ items: newData }));
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Style",
      dataIndex: "style",
      width: "30%",
      editable: true,
    },
  

    {
      title: "Participants",
      dataIndex: "holderId",
      width: "40%",
      editable: true,
      render: (_, record) => (
        <EditableCell
          title="Participants"
          editable
          dataIndex="holderId"
          record={record}
          handleSave={handleSave}
        >
          <Select
            mode="multiple"
            placeholder="Select participants"
            maxTagCount="responsive"
            filterOption={false} // Disable option filtering
            allowClear
            style={{ width: "300px" }}
            value={record.holderId} // Use record.participants
            onChange={(selectedParticipants) => {
              // Filter out the selected participants that don't have corresponding names
              
              handleParticipantChange(record, selectedParticipants); // Pass the record and filtered selected participants
            }}
          >
            {participants
              .slice() // Create a copy of the participants array
              .sort((a, b) => b.stats[0].relevance - a.stats[0].relevance) // Sort by relevance in descending order
              .map((participant) => (
                <Select.Option key={participant.id} value={participant.id}>
                  {participant.name}
                </Select.Option>
              ))}
          </Select>
        </EditableCell>
      ),
    },

    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
   
      id: uuidv4(),
    
          name: "Championship",
          style: " Champion",
          holderId: [],
          holderStartDate: Date(2023, 6, 10, 15, 30),
          holderEndDate: "Present",
          pastHolders: [
          
          ],
      
    };
    setDataSource([...dataSource, newData]);
    dispatch(setStats({ items: dataSource }));
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = dataSource.map((item) => {
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
  const columns =defaultColumns.map((col) => {
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
        render: col.render, // Keep the existing render function
        // Add an onChange function to update the dataSource directly
        onChange: (newSelectedParticipants) => {
          // Update the record with the new selected participants
          const updatedRecord = { ...record, holderId: newSelectedParticipants };
          const newData = [...dataSource];
          const index = newData.findIndex((item) => record.id === item.id);
          if (index > -1) {
            newData.splice(index, 1, updatedRecord);
          }
          setDataSource(newData);

          // Call handleParticipantChange to perform any additional logic if needed
          handleParticipantChange(updatedRecord, newSelectedParticipants);
        },
      }),
    };
  })

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add A Relationship
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default ItemsEditor;


