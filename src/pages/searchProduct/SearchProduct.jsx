import "./searchProduct.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../../feature/searshProductSlice";
import {
  getSearchProducts,
  clearSearch,
} from "../../feature/searshProductSlice";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchSearch(searchTerm));
  }, [searchTerm]);

  return (
    <section>
      <div className="container">
        <div className="row">
          {searchProducts?.map((item, index) => {
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
                    <p className="card-text price old">Price:$ {item.price}</p>
                    <p className="card-text discount">Discount:$ {disCount}</p>
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
};

export default SearchProduct;
