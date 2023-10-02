import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Popconfirm, Table, Switch, Collapse, message } from "antd";
import { setStats } from "state";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import './StatPerceptionEditor.css'
import StatPerception from "../statPerception/StatPerception";


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

  const [messageApi, contextHolder] = message.useMessage();         

  const replaceUser = async (user) => {
    const bodyData = {
      id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    impressions: user.impressions,
    mainLogs: user.mainLogs,
    participants: user.participants,
    items: user.items,
    stats: user.stats,
    relationships: user.relationships,
    recentEvents: user.recentEvents,
    statPerception: user.statPerception,
    arcs: user.arcs,
    date: user.date,
    randomEvents: user.randomEvents,
    categories:user.categories,

    };
  
    try {
      // Display loading message
      messageApi.loading({ content: 'Replacing data...', key: 'replaceUserMessage' });
  
      const response = await fetch("https://bookboard-app.onrender.com/auth/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      const data = await response.json();
  
      // Display success message
      messageApi.success({ content: 'Data replaced successfully!', key: 'replaceUserMessage' });
  
      console.log(data);
    } catch (error) {
      // Display error message
      messageApi.error({ content: 'Failed to replace data!', key: 'replaceUserMessage' });
      console.error("Error replacing user:", error);
    }
  };

  const user = useSelector((state) => state.user);

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

      replaceUser(user)
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
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          type={dataIndex === "change" ? "number" : "text"}
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

const EditablePercentiles = ({ statName, top1, top5Percentile, top10Percentile, top20Percentile, top40Percentile, top80Percentile, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [editedTop1, setEditedTop1] = useState(top1);
    const [editedTop5, setEditedTop5] = useState(top5Percentile);
    const [editedTop10, setEditedTop10] = useState(top10Percentile);
    const [editedTop20, setEditedTop20] = useState(top20Percentile);
    const [editedTop40, setEditedTop40] = useState(top40Percentile);
    const [editedTop80, setEditedTop80] = useState(top80Percentile);
  
    const toggleEdit = () => {
      setEditing(!editing);
    };
  
    const handleValueChange = (setter, e) => {
      setter(e.target.value);
    };
  
    const handleSaveValue = () => {
      onSave(
        statName,
        editedTop1,
        editedTop5,
        editedTop10,
        editedTop20,
        editedTop40,
        editedTop80
      );
      toggleEdit();
    };
  
    return (
    <Collapse defaultActiveKey={["1"]} ghost>
    <Collapse.Panel header="Edit Percentiles" key="1">
      {editing ? (
        <>
          <div className="percentile-input">
            <span>Top 1%: </span>
            <Input
              value={editedTop1}
              onChange={(e) => handleValueChange(setEditedTop1, e)}
              
            />
          </div>
          <div className="percentile-input">
            <span>Top 5%: </span>
            <Input
              value={editedTop5}
              onChange={(e) => handleValueChange(setEditedTop5, e)}
              
            />
          </div>
          <div className="percentile-input">
            <span>Top 10%: </span>
            <Input
              value={editedTop10}
              onChange={(e) => handleValueChange(setEditedTop10, e)}
              
            />
          </div>
          <div className="percentile-input">
            <span>Top 20%: </span>
            <Input
              value={editedTop20}
              onChange={(e) => handleValueChange(setEditedTop20, e)}
              
            />
          </div>
          <div className="percentile-input">
            <span>Top 40%: </span>
            <Input
              value={editedTop40}
              onChange={(e) => handleValueChange(setEditedTop40, e)}
              
            />
          </div>
          <div className="percentile-input">
            <span>Top 80%: </span>
            <Input
              value={editedTop80}
              onChange={(e) => handleValueChange(setEditedTop80, e)}
              
            />
          </div>
          <Button onClick={handleSaveValue}>Save</Button>
        </>
      ) : (
        <>
          <p>Top 1%: {top1}</p>
          <p>Top 5%: {top5Percentile}</p>
          <p>Top 10%: {top10Percentile}</p>
          <p>Top 20%: {top20Percentile}</p>
          <p>Top 40%: {top40Percentile}</p>
          <p>Top 80%: {top80Percentile}</p>
          <Button onClick={toggleEdit}>Edit</Button>
        </>
      )}
    </Collapse.Panel>
  </Collapse>
);
  };
  

const StatsPerceptionEditor = () => {
  const user = useSelector((state) => state.user);
  const statsReadOnly = useSelector((state) => state.user.stats);
  const statPerceptionReadOnly = useSelector((state) => state.user.statPerception);

  const statPerception = _.cloneDeep(statPerceptionReadOnly);
  const stats = _.cloneDeep(statsReadOnly);

  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState(statPerceptionReadOnly);

  useEffect(() => {
    setDataSource(statPerceptionReadOnly);
  }, [statPerceptionReadOnly]);

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
    dispatch(setStats({ statPerception: newData }));
  };

  const handleSavePercentiles = (editedStatName, editedTop1, editedTop5, editedTop10, editedTop20, editedTop40, editedTop80) => {
    const newData = dataSource.map((item) => {
      if (item.statName === editedStatName) {
        return {
          ...item,
          top1: editedTop1,
          top5Percentile: editedTop5,
          top10Percentile: editedTop10,
          top20Percentile: editedTop20,
          top40Percentile: editedTop40,
          top80Percentile: editedTop80,
        };
      }
      return item;
    });
    setDataSource(newData);
    dispatch(setStats({ statPerception: newData }));
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "statName",
      width: "30%",
      editable: false,
    },
  ];
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

  // Add a new column for expandable section
  columns.push({
    title: "Edit Percentiles",
    dataIndex: "statName",
    width: "20%",
    render: (statName, record) => (
      <EditablePercentiles
        statName={statName}
        top1={record.top1}
        top5Percentile={record.top5Percentile}
        top10Percentile={record.top10Percentile}
        top20Percentile={record.top20Percentile}
        top40Percentile={record.top40Percentile}
        top80Percentile={record.top80Percentile}
        onSave={handleSavePercentiles}
      />
    ),
  });

  return (
    <div style={{ overflow: 'auto', minWidth: '400px' }}>
    <StatPerception />
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={columns}
      rowKey="id"
    />
  </div>
  
  );
};



export default StatsPerceptionEditor;
