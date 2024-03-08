import React, { useEffect, useState } from "react";
//Components
import Modal from "../Components/Modal";
import { Button } from "antd";
import { toast } from "react-toastify";
//Utility Funcions
import { PostApi } from "./axios-api";
import GetUser from "./get-data";

function Report({ type, id, userId, show, onClose }) {
  const [open, setOpen] = useState(show);
  const user = GetUser();
  const [reason, setReason] = useState("");

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const Submit = async () => {
    if (reason != "") {
      try {
        const res = await PostApi("report", {
          by_user_id: user.id,
          user_id: userId,
          reported_item_id: id,
          reported_item_type: type,
          reason: reason,
        });

        if (res) {
          if (res.message == "report submitted successfully") {
            toast.success("Report submitted successfully!!");
            setReason("");
            setOpen(false);
          } else {
            toast.error("Report failed!!");
          }
        } else {
          toast.error("Something went wrong!!");
        }
      } catch (error) {
        toast.error("Something went wrong!!");
        console.log("error", error);
      }
    } else {
      toast.error("Reason Required!!");
    }
  };

  return (
    <Modal
      text="Submit Report"
      open={open}
      onClose={() => {
        setOpen(false);
        onClose();
      }}
    >
      <div className="w-full h-full mt-4 overflow-y-auto">
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          className={
            "bg-gray-100 text-[17px] px-4 h-[49px] outline-none rounded-[0.5em] w-[100%] mt-3"
          }
        />
      </div>
      <div className="w-full mt-4 flex justify-end items-center gap-2">
        <Button
          style={{
            backgroundColor: "rgb(156 163 175)",
            border: "none",
            color: "white",
          }}
          onClick={() => {setOpen(false); onClose()}}
          className="xs:px-3 w-20 font-bold xs:py-2 rounded-3xl xs:w-32 h-11"
        >
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(182, 204, 55)",
            border: "none",
            color: "black",
          }}
          className="xs:px-3 w-20 font-bold xs:py-2 rounded-3xl xs:w-32 h-11"
          onClick={Submit}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default React.memo(Report);