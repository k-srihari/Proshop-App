import { StrictMode, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { deleteOrderAction, getAllOrdersAction } from '../actions/adminActions'
import LoadingSpinner from '../Components/LoadingSpinner.js'

const OrdersListScreen = ({ history }) => {
  const { isLoading, orders, error } = useSelector(
    (state) => state.getAllOrdersReducer
  )
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { isSuccess } = useSelector((state) => state.orderDeleteReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) return history.push('/login?redirect=/')
    dispatch(getAllOrdersAction())
  }, [history, userInfo, dispatch, isSuccess])

  const handleOrderDelete = (id) => {
    dispatch(deleteOrderAction(id))
  }

  return (
    <StrictMode>
      <LinkContainer to={'/'}>
        <Button className="btn-sm mb-3" variant="light">
          Home
        </Button>
      </LinkContainer>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-danger">{error.message}</p>
      ) : (
        <>
          <h2>Orders List</h2>
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Ordered On</th>
                <th>Order Items</th>
                <th>Amount</th>
                <th>Is Paid</th>
                <th>Is Delivered</th>
                <th>Ordered By (user ID)</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                    <td>
                      {order.orderItems.map((item) => (
                        <li key={item.itemID}>
                          {
                            <>
                              <b>{item.quantity + 'x '}</b>
                              {item.itemName}
                            </>
                          }
                        </li>
                      ))}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        <span>
                          <i className="fas fa-check text-success" />
                          <br />
                          {'(' + order.paidAt.slice(0, 10) + ')'}
                        </span>
                      ) : (
                        <i className="fas fa-times text-danger" />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <span>
                          <i className="fas fa-check text-success" />
                          <br />
                          {'(' + order.deliveredAt.slice(0, 10) + ')'}
                        </span>
                      ) : (
                        <i className="fas fa-times text-danger" />
                      )}
                    </td>
                    <td>{order.orderedBy}</td>
                    <td>
                      <Link to={`/orders/${order._id}`}>
                        <i className="fas fa-search text-info" />
                      </Link>
                      <i
                        className="fas fa-trash text-danger"
                        onClick={() => handleOrderDelete(order._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </StrictMode>
  )
}

export default OrdersListScreen
