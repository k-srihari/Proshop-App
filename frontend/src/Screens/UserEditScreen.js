import { StrictMode, useEffect, useRef } from 'react'
import {
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { USER_EDIT_RESET } from '../constants/userConstants'
import { editUserAction, getUserAction } from '../actions/adminActions'
import FormComponent from '../Components/FormComponent'
import LoadingSpinner from '../Components/LoadingSpinner'
import { Link } from 'react-router-dom'

const UserEditScreen = ({ match, history }) => {
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const {
    isLoading: gettingUser,
    user,
    error: errorGetting,
  } = useSelector((state) => state.getUserReducer)
  const { isSuccess: updateSuccess, error: errorUpdating } = useSelector(
    (state) => state.editUserReducer
  )

  const dispatch = useDispatch()

  const nameField = useRef('')
  const emailField = useRef('')
  const adminField = useRef(true)

  useEffect(() => {
    if (!userInfo)
      return history.push(`/login?redirect=users/${match.params.id}/edit`)

    if (!user || user._id !== match.params.id || updateSuccess) {
      dispatch({ type: USER_EDIT_RESET })
      dispatch(getUserAction(match.params.id))
    }

    if (user && nameField.current) {
      nameField.current.value = user.userName
      emailField.current.value = user.emailID
      adminField.current.checked = user.isAdmin
    }
  }, [userInfo, history, match, user, dispatch, updateSuccess])

  const handleFormSubmission = (e) => {
    e.preventDefault()

    const reqBody = {
      name: nameField.current.value,
      email: emailField.current.value,
      adminStatus: adminField.current.checked,
    }
    dispatch(editUserAction(user._id, reqBody))
  }

  return (
    <StrictMode>
      <Link to={'/admin/users/all'}>
        <Button variant="light" className="btn-sm mb-4">
          Go Back
        </Button>
      </Link>
      <h2 className="mb-4">User [{match.params.id}]</h2>
      {gettingUser ? (
        <LoadingSpinner />
      ) : errorGetting || errorUpdating ? (
        <p className="text-danger">
          {errorGetting.message || errorUpdating.message}
        </p>
      ) : (
        user && (
          <FormComponent>
            <Form onSubmit={handleFormSubmission}>
              <FormGroup controlId="user-name">
                <FormLabel>User Name: </FormLabel>
                <FormControl type="text" ref={nameField} />
              </FormGroup>
              <FormGroup controlId="user-email">
                <FormLabel>User Email: </FormLabel>
                <FormControl type="email" ref={emailField} />
              </FormGroup>
              <FormGroup controlId="admin-status">
                <FormCheck
                  type="checkbox"
                  ref={adminField}
                  style={{ display: 'inline-block' }}
                />
                <FormLabel className="m-2">{'Is Admin'}</FormLabel>
              </FormGroup>
              <Button type="submit" className="btn-md my-2" variant="dark">
                Update User
              </Button>
            </Form>
          </FormComponent>
        )
      )}
    </StrictMode>
  )
}

export default UserEditScreen
