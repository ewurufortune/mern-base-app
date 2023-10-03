import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, Popconfirm, Table, Switch, Space, message } from "antd";
import { setStats } from "state";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

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
  const user = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();         

  const replaceUser = async (user) => {
          setTimeout(messageApi.destroy,2000);

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
            setTimeout(messageApi.destroy,2000);

  
      console.log(data);
    } catch (error) {
      // Display error message
      messageApi.error({ content: 'Failed to replace data!', key: 'replaceUserMessage' });
            setTimeout(messageApi.destroy,2000);

      console.error("Error replacing user:", error);
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
  
      // Additional validation for number inputs
      if (dataIndex === "change" && isNaN(values[dataIndex])) {
        throw new Error(`${title} must be a number.`);
      }
  
      // Add a condition to handle the statName property
      if (dataIndex === "statName") {
        // Remove spaces and convert to lowercase
        values[dataIndex] = values[dataIndex].replace(/\s/g, "").toLowerCase();
      }
  
      // Explicitly parse the 'change' property as a number
      if (dataIndex === "change") {
        values[dataIndex] = parseFloat(values[dataIndex]);
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

const StatsEditor = () => {
  const user = useSelector((state) => state.user);
  const stats = useSelector((state) => state.user.stats);
  const participantsReadOnly = useSelector((state) => state.user.participants);
  const participants=_.cloneDeep(participantsReadOnly)
  const statPerceptionReadOnly = useSelector((state) => state.user.statPerception);
  const statPerception=_.cloneDeep(statPerceptionReadOnly)
  // { statName: "overness", label: "Major Overness Success", change: 5 },
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState(stats);
  const [count, setCount] = useState(stats.length);

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
              setTimeout(messageApi.destroy,2000);

  
      console.log(data);
    } catch (error) {
      // Display error message
      messageApi.error({ content: 'Failed to replace data!', key: 'replaceUserMessage' });
              setTimeout(messageApi.destroy,2000);

      console.error("Error replacing user:", error);
    }
  };
  useEffect(() => {
    setDataSource(stats);
  }, [stats]);

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
    dispatch(setStats({ stats: newData }));
    replaceUser(user)
  };

  const handleDeleteStat = (statNameToDelete) => {
    console.log(statNameToDelete);
    const updatedParticipants = participants.map((participant) => {
      const updatedStats = participant.stats.filter((stat) => {
        // Check if the stat object contains the statNameToDelete property
        return !stat[statNameToDelete];
      });
      return {
        ...participant,
        stats: updatedStats,
      };
    });


    //************************REMOVE ALL STATS EXCEPT RELEVANCE********************************* */
    // const statNameToKeep = "relevance"; // StatName to keep

  //   // Remove all stats except for the specified statName from participants' stats arrays
  //   const updatedParticipants = participants.map((participant) => {
  //     const updatedStats = participant.stats.filter((stat) => {
  //       // Keep only the specified statName and remove others
  //       return stat[statNameToKeep];
  //     });
  //     return {
  //       ...participant,
  //       stats: updatedStats,
  //     };
  //   });
  //  // Remove all stats except for the specified statName from the global stats array
  //  const updatedGlobalStats = stats.filter((stat) => stat[statNameToKeep]);
  // const updatedStatPerception = statPerception.filter((statPercept) => statPercept.statName === statNameToKeep);

  // *****************************************************************************************************///
   
  // Update state and dispatch the new data
    dispatch(setStats({ participants: updatedParticipants }));

     
 // Remove matching statNames from the global stats array
 const updatedGlobalStats = stats.filter((stat) => !stat[statNameToDelete])
 const updatedStatPerception = statPerception.filter((statPercept) => statPercept.statName !== statNameToDelete);
 setDataSource(updatedGlobalStats);
 
 dispatch(setStats({ stats: updatedGlobalStats, statPerception:updatedStatPerception }));
    console.log(updatedParticipants);
    replaceUser(user)
  };
  
  
  
  

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "statName",
      width: "30%",
      editable: true,
    },
    {
      title: "Label",
      dataIndex: "label",
      width: "30%",
      editable: true,
    },
    {
      title: "Stat Change",
      dataIndex: "change",
      width: "5%",
      editable: true,
    },

    {
      title: "Delete Stat Change",
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
    {
      title: 'Delete Stat From All',
      dataIndex: 'statName',
      width: "5%",

      render: (statName, record) => (
        <Popconfirm
          title={`Are you sure you want to delete all ${statName} stats for this participant?`}
          onConfirm={() => handleDeleteStat( record.statName)}
          okText="Yes"
          cancelText="No"
        >
          <Button  style={{
    padding: "5px 10px", // Adjust the padding to reduce button size
    fontSize: "9px",   // Adjust the font size to make text smaller
  }} className="button-24" type="danger"> {statName}</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleAdd = () => {
    const newData = {
      id: uuidv4(),
      statName: `overness`,
      isActive: true, // Set the initial value to true
      bio: "What does it mean?",
      label: "Minor Increase",
      change: 5,
    };
    setDataSource([...dataSource, newData]);
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
        rowClassName={() => "editable-row"}
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
          rowExpandable: (record) => record.name !== "Not Expandable",
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
      <Button onClick={toggleEdit}>{editing ? "Save" : "Edit"}</Button>
    </div>
  );
};
export default StatsEditor;
