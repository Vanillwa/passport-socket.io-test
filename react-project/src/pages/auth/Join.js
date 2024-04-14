import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchJoin } from "../../service/api";

function Join() {
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let nickname = e.target.nickname.value;
    let password = e.target.password.value;

    let body = { username, nickname, password, role: "USER" };
    const res = await fetchJoin(body);
    console.log(res);
    if (res === "duplicated") {
      alert("중복된 username입니다.");
      return;
    } else if (res === "success") {
      alert("회원가입에 성공했습니다.");
      navigate("/auth/login");
    }
  };
  return (
    <form onSubmit={handleJoin}>
      <div>
        <label htmlFor='username'>Username</label>
        <input name='username' id='username' required autoComplete='off'></input>
      </div>
      <div>
        <label htmlFor='nickname'>nickname</label>
        <input name='nickname' id='nickname' required autoComplete='off'></input>
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input type='password' name='password' id='password' required autoComplete='off'></input>
      </div>
      <Button type='submit'>가입</Button>
    </form>
  );
}

export default Join;
