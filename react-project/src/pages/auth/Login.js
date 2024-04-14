import { Button } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../service/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;

    const body = { username, password };
    const res = await fetchLogin(body);

    if (res.message === "success") {
      login(res.userInfo);
      navigate("/");
    } else if (res.message === "NoExist") {
      alert("존재하지 않는 계정입니다.");
      return;
    } else if (res.message === "PwdFail") {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>Username</label>
        <input name='username' id='username' required autoComplete='on'></input>
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input type='password' name='password' id='password' required autoComplete='off'></input>
      </div>
      <Button type='submit'>로그인</Button>
    </form>
  );
}

export default Login;
