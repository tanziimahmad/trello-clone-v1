// import Image from 'next/image'

// export default function Home() {
//   return (
//     <div>Aj ki sham opi ke nam</div>
//   )
// }

"use client";
import { deleteBoard, getBoards } from "@/api/apiService";
import BoardForm from "@/components/BoardForm";
import Boards from "@/components/Boards";
import Modal from "@/components/modal";
import useUtility from "@/hooks/useUtilityContext";
import React, { useEffect, useState } from "react";

export default function AllBoardsPage() {
  const [boards, setBoards] = useState([]);
  const { apiKey, apiToken, organizationId } = useUtility();
  const [reload, setReload] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newData, setNewData] = useState({});

  const getData = async () => {
    try {
      const res = await getBoards(organizationId, apiKey, apiToken);
      setBoards(res.data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const confirmUpdate = async (id) => {
    console.log("OPI");
    // try {
    //   const res = await updateBoard(id, apiKey, apiToken, newData);
    //   if (res.status === 200) {
    //     setReload(!reload);
    //     closeModal();
    //   }
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  const handleUpdate = (data) => {
    setNewData(data ?? {});
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBoard(id, apiKey, apiToken);
      if (res.status === 200) setReload(!reload);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if ((organizationId, apiKey, apiToken)) getData();
  }, [organizationId, apiKey, apiToken, reload]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log("boards", boards);
  return (
    <div className="p-4">
      All Board
      <div className="w-2/5">
        {boards.map((board) => {
          return (
            <Boards
              board={board}
              handleDelete={handleDelete}
              key={board.id}
              handleUpdate={handleUpdate}
            />
          );
        })}

        {modalIsOpen && (
          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            <BoardForm
              data={newData}
              setData={setNewData}
              handleSubmit={confirmUpdate}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
