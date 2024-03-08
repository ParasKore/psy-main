import { useSelector } from "react-redux";
import { selectUser } from "../redux/Slice/userSlice";
import { selectToken } from "../redux/Slice/userSlice";

export default function GetUser() {
  return useSelector(selectUser);
}

export function GetToken() {
  return useSelector(selectToken);
}

export function GetHost() {
  return "https://lebecho.com/";
  // return "http://127.0.0.1:8000/";
}
