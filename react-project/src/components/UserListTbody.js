import { Button } from "react-bootstrap";
import FormatDate from "../service/FormatDate";
import { requestChat } from "../service/api";
import { useNavigate } from "react-router-dom";

function UserListTbody({ data, status }) {
  const navigate = useNavigate();

  const handleRequest = async (targetId) => {
    const res = await requestChat(targetId);
    if (res.message === "success") {
      navigate(`/chat/room/${res.roomId}`);
    } else if (res.message === "NoAuth") {
      alert("로그인이 필요한 서비스입니다");
      navigate("/auth/login");
    }
  };

  if (status === "loading") {
    return (
      <tr>
        <td colSpan={5}>loading...</td>
      </tr>
    );
  }
  if (status === "error") {
    return (
      <tr>
        <td colSpan={5}>error occured!</td>
      </tr>
    );
  }
  return (
    <>
      {data.map((item) => {
        return (
          <tr key={item.id}>
            <td className='col-1'>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.nickname}</td>
            <td>
              <FormatDate dateString={item.createdAt} />
            </td>
            <td>
              <Button className='btn-sm' onClick={() => handleRequest(item.id)}>
                Request
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default UserListTbody;
