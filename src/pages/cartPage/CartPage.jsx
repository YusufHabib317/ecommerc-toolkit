import "./cartPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  getAllCarts,
  clearCart,
  getCartItemsTotal,
  getCartItemsTotalQuantities,
  getTotals,
} from "../../feature/cartSlice";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

//---------------------------------------------------------

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const totalQuantity = useSelector(getCartItemsTotalQuantities);
  const totalPrice = useSelector(getCartItemsTotal);
  useEffect(() => {
    dispatch(getTotals());
  }, [carts]);
  const handelDec = (item) => {
    dispatch(decreaseCart(item));
  };

  const handelInc = (item) => {
    dispatch(addToCart(item));
  };

  if (carts.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="empty">
            <h2>The Cart Is Empty</h2>
            <button className="goShop">
              <Link to="/">Go Shopping Now</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Product</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item, index) => {
                let discountedPrice =
                  item.price - (item?.price * item.discountPercentage) / 100;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{item?.title}</th>
                    <th scope="row">{Math.floor(discountedPrice)}</th>
                    <th scope="row qtr">
                      <span className="span" onClick={() => handelDec(item)}>
                        <FaArrowCircleDown />
                      </span>
                      <span className="span">{item?.cartQuantity}</span>
                      <span
                        onClick={() => handelInc(item)}
                        className="span inc"
                      >
                        <FaArrowCircleUp />
                      </span>
                    </th>
                    <th scope="row">
                      {Math.floor(discountedPrice * item?.cartQuantity)}
                    </th>
                    <th scope="row">
                      <span
                        className="trash"
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        <AiTwotoneDelete />
                      </span>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="row">
            <div className="clear mt-3">
              <button type="button" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
            </div>
          </div>
          <div className="row">
            <div className="mt-3">
              <p>Total ({Math.floor(totalQuantity)}) items: </p>
              <span>{totalPrice}</span>
              <p className="chekOut">
                <button type="button">Check Out</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
