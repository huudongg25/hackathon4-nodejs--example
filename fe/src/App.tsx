import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import baseAxios from "./api/baseAxios";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
function App() {
  const [data, setData] = useState<any[]>([]);
  const [sort, setSort] = useState<string>("");
  const [isUpdate,setIsUpdate] = useState(false)
  const [formCreate, setFormCreate] = useState({
    name: "",
    age: "",
    desc: "",
    class: "",
  });
  //ok
  const [isModal, setIsModal] = useState(false);
  const idUpdate = useRef(0);

  const handleGetData = async () => {
    if (sort === "") {
      const result = await baseAxios.get(`/user`);
      setData(result.data);
    } else {
      const result = await baseAxios.get(`/user/?sort=${sort}`);
      setData(result.data);
    }
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              setIsModal(true);
              idUpdate.current = record.id;
              setIsUpdate(true)
              setFormCreate({
                name: record.name,
                age: record.age,
                class: record.class,
                desc: record.desc,
              });
            }}
          >
            update
          </button>
          <button onClick={() => handleDelete(record.id)}>delete</button>
        </Space>
      ),
    },
  ];

  const handleChangeFormCreate = (e: any) => {
    const { name, value } = e.target;
    setFormCreate({
      ...formCreate,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      if(isUpdate){
        await baseAxios.patch(`/user/update/${idUpdate.current}`, formCreate);
        setIsModal(false);
        setFormCreate({
          name:"",
          age:"",
          desc:"",
          class:""
        })
        setIsUpdate(false)
        handleGetData();
      }else {
        await baseAxios.post("/user", formCreate);
        setIsModal(false);
        setFormCreate({
          name:"",
          age:"",
          desc:"",
          class:""
        })
        handleGetData();
      }
    } catch (error) {
      console.log(error);
      alert("lỗi");
    }
  };

  const handleDelete = async (id: number) => {
    await baseAxios.delete(`/user/delete/${id}`);
    handleGetData();
  };

  return (
    <div className="App">
      <h3>Phúc đần list</h3>
      {isModal ? (
        <div className="modal">
          <div className="content-modal">
            <span onClick={() => {
              setIsModal(false)
              setFormCreate({
                name:"",
                age:"",
                desc:"",
                class:""
              })
              setIsUpdate(false)
            }}>X</span>
            {isUpdate ? <h4>Update user</h4> : <h4>Create user</h4>}
            <form onSubmit={handleSubmitForm}>
              <input
                onChange={handleChangeFormCreate}
                type="text"
                value={formCreate.name}
                placeholder="name"
                name="name"
              />
              <input
                onChange={handleChangeFormCreate}
                type="text"
                value={formCreate.desc}
                placeholder="description"
                name="desc"
              />
              <input
                onChange={handleChangeFormCreate}
                type="text"
                value={formCreate.age}
                placeholder="age"
                name="age"
              />
              <input
                onChange={handleChangeFormCreate}
                type="text"
                value={formCreate.class}
                placeholder="class"
                name="class"
              />
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <FaSortUp onClick={() => setSort("DESC")} />
        <FaSortDown onClick={() => setSort("ASC")} />
      </div>
      <button onClick={() => setIsModal(true)}>create new student</button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default App;
