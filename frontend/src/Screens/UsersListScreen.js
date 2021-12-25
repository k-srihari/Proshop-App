import { StrictMode, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteUserAction, getAllUsersAction } from '../actions/adminActions'
import Spinner from '../Components/LoadingSpinner'

const UsersListScreen = ({ history }) => {
  const { isLoading, users, error } = useSelector(
    (state) => state.getAllUsersReducer
  )
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { isSuccess: deleteSuccess, error: errorDeleting } = useSelector(
    (state) => state.deleteUserReducer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=/admin/users/all')
    }
    dispatch(getAllUsersAction())
    if (errorDeleting) console.error(errorDeleting)
  }, [dispatch, userInfo, history, deleteSuccess, errorDeleting])

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete user: [' + id + ']?')) {
      dispatch(deleteUserAction(id))
    }
  }

  return (
    <StrictMode>
      <LinkContainer to={'/'}>
        <Button variant="light" className="btn-sm mb-3">
          Home
        </Button>
      </LinkContainer>
      <h2>Users List</h2>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-danger">{error.message}</p>
      ) : (
        <Table bordered striped responsive hover className="table-sm my-3">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.emailID}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check text-success" />
                  ) : (
                    <i className="fas fa-times text-danger" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <i className="fa fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </StrictMode>
  )
}

export default UsersListScreen
