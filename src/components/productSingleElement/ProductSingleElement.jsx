import "./productSingleElement.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductSingle,
  getProductSingle,
} from "../../feature/productSlice";
import { useParams } from "react-router-dom";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { addToCart, getTotals } from "../../feature/cartSlice";
import { useState, useEffect } from "react";
import { getAllCarts } from "../../feature/cartSlice";

const ProductSingleElement = () => {
  const carts = useSelector(getAllCarts);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      let tempQ = prev + 1;
      if (tempQ > product?.stock) tempQ = product?.stock;
      return tempQ;
    });
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [carts]);

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      let tempQ = prev - 1;
      if (tempQ < 1) tempQ = 1;
      return tempQ;
    });
  };

  const addToCartHandler = (product) => {
    let disCountedPrice =
      product.price - (product.price * product.discountPercentage) / 100;
    let totalPrice = disCountedPrice * quantity;
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice: totalPrice,
      })
    );
  };

  const product = useSelector(getProductSingle);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductSingle(id));
  }, [fetchProductSingle]);
  let discounted = Math.floor(
    product.price - (product.price * product.discountPercentage) / 100
  );
  return (
    <section className="productSingle">
      <div className="container">
        <div className="row">
          <div className="co-12">
            <div className="thumbnail-product">
              <img src={product.thumbnail} alt="" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="content">
            <div className="text-title">{product.title}</div>
            <div className="text-title">{product.description}</div>
            <div className="product-description">
              <span>
                <span className="pink">Raiting : </span>
                {product.rating}
              </span>
              <span className="verLine"></span>
              <span className="brand">
                <span className="pink">Brand:</span> {product.brand}
              </span>
              <span className="verLine"></span>
              <span className="brand">
                <span className="pink">Category:</span> {product.category}
              </span>
              <span className="verLine"></span>
            </div>
            <div className="productPrice mt-4">
              <div>
                <span className="oldPrice"> ${product.price}</span>
                <span> Include All Texas</span>
                <div className="newPrice">${discounted}</div>
              </div>
            </div>
            {/* <div className="row quantity mt-4">
              <div className="text">Quantity :</div>
              <div className="indec">
                <button
                  className="down"
                  type="button"
                  onClick={() => decreaseQuantity()}
                >
                  <FaArrowCircleDown />
                </button>
                <div className="q">{quantity}</div>
                <button
                  className="up"
                  type="button"
                  onClick={() => increaseQuantity()}
                >
                  <FaArrowCircleUp className="pink" />
                </button>
                {product.stock === 0 ? (
                  <div className="emptyStock mt-5 p-2">Out Of Stock</div>
                ) : (
                  ""
                )}
              </div>
            
            </div> */}
            <div className="buttons mt-4">
              <button type="button" onClick={() => addToCartHandler(product)}>
                Add To Cart
              </button>
              <button type="button">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSingleElement;
