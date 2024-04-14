import { useQuery } from "react-query";
import styles from "../../css/user/UserList.module.css";
import { Table } from "react-bootstrap";
import UserListTbody from "../../components/UserListTbody";
import { getUserList } from "../../service/api";

function UserList() {
  const { data, status } = useQuery(["getUserList"], () => getUserList(), {
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <section>
      <h3 className='pt-3 pb-3 ps-2 text-center'>User List</h3>
      <Table variant='dark' className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Nickname</th>
            <th>Join Date</th>
            <th>Chatting</th>
          </tr>
        </thead>
        <tbody>
          <UserListTbody data={data} status={status} />
        </tbody>
      </Table>
    </section>
  );
}

export default UserList;
