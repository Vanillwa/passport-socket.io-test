import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Join from "./pages/auth/Join";
import Login from "./pages/auth/Login";
import UserList from "./pages/user/UserList";
import "./css/App.css";
import { Container } from "react-bootstrap";
import ChatList from "./pages/chat/ChatList";
import ChatRoom from "./pages/chat/ChatRoom";

function App() {
  return (
    <>
      <Header></Header>
      <Container>
        <Routes>
          <Route index element={<Main />}></Route>
          <Route path='auth'>
            <Route path='login' element={<Login />}></Route>
            <Route path='join' element={<Join />}></Route>
          </Route>
          <Route path='user'>
            <Route path='list' element={<UserList />}></Route>
          </Route>
          <Route path='chat'>
            <Route path='list'>
              <Route index element={<ChatList />}></Route>
              <Route path=':roomId' element={<ChatRoom />}></Route>
            </Route>
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
