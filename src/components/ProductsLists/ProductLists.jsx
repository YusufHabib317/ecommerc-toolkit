import "./productLists.css";
import {
  getAllProducts,
  productStatus,
  productError,
} from "../../feature/productSlice";
import { getAllCategories } from "../../feature/categorySlice";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductLists = () => {
  const ele = useSelector(getAllProducts);
  const products = ele.products;
  const product_Status = useSelector(productStatus);
  const product_Error = useSelector(productError);
  const gategories = useSelector(getAllCategories);

  let content;
  if (product_Status === "loading") {
    content = <div>Loading...</div>;
  } else if (product_Status === "success") {
    content = (
      <section className="products py-3">
        <div className="container">
          <h2 className="mt-3">Our Product :</h2>
          <div className="row">
            {products?.map((item, index) => {
              const disCountPrice = Math.floor(
                item.price - (item.price * item.discountPercentage) / 100
              );
              const disCount = Math.floor(
                (item.price * item.discountPercentage) / 100
              );
              return (
                <div key={index} className="col-md-6 col-lg-4 col-12">
                  <div className="product-cart card m-2">
                    <div className="image-card">
                      <img src={item.thumbnail} className="card-img-top" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text category">
                        category: {item.category}
                      </p>
                      <p className="card-text price old">
                        Price:$ {item.price}
                      </p>
                      <p className="card-text discount">
                        Discount:$ {disCount}
                      </p>
                      <p className="card-text price new">
                        Price:$ {disCountPrice}
                      </p>
                      <Link
                        className="showProduct p-2 rounded"
                        to={`/products/${item.id}`}
                      >
                        Show Product
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else if (productStatus === "failed") {
    content = <div>{product_Error}</div>;
  }

  return (
    <div>
      <div className="category">
        <div className="container ">
          <h2 className="mt-3">Categories :</h2>
          <div className="row text-center mt-3 content">
            {gategories?.map((item, index) => {
              return (
                <div key={index} className="col-3 col-md-3 col-lg-2 m-2 item">
                  <Link to={`products/category/${item}`}>{item}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default ProductLists;
