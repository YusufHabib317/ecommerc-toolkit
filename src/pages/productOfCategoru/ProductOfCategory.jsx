import "./productOfCategory.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchProductsOfCategory,
  getAllProductsByCategory,
} from "../../feature/categorySlice";

const ProductOfCategory = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    dispatch(fetchProductsOfCategory(category));
  }, [dispatch, category]);

  const el = useSelector(getAllProductsByCategory);
  const products = el.products;

  return (
    <section>
      <div className="container">
        <div className="row">
          {products?.map((item) => {
            const disCountPrice = Math.floor(
              item.price - (item.price * item.discountPercentage) / 100
            );
            const disCount = Math.floor(
              (item.price * item.discountPercentage) / 100
            );
            return (
              <div className="col-md-6 col-lg-4 col-12">
                <div className="product-cart card m-2">
                  <div className="image-card">
                    <img src={item.thumbnail} className="card-img-top" alt="" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text category">
                      category: {item.category}
                    </p>
                    <p className="card-text price old">Price:$ {item.price}</p>
                    <p className="card-text discount">Discount:$ {disCount}</p>
                    <p className="card-text price new">
                      Price:$ {disCountPrice}
                    </p>
                    <Link
                      className="showProduct p-2 rounded"
                      to={`ecommerc-toolkit/products/${item.id}`}
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
};

export default ProductOfCategory;
