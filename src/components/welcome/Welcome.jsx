import "./welcome.css";
import girl from "../../assets/slider-img.png";
const Welcome = () => {
  return (
    <section className="welcome py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 d-flex justify-content-center">
            <div className="text d-flex justify-content-center ">
              <h2 className="text-light mb-3">Welcome To Our Gift Shop</h2>
              <p className="text-light fs-5 mt-4">
                Sequi perspiciatis nulla reiciendis, rem, tenetur impedit,
                eveniet non necessitatibus error distinctio mollitia suscipit.
                Nostrum fugit doloribus consequatur distinctio esse, possimus
                maiores aliquid repellat beatae cum, perspiciatis enim,
                accusantium perferendis.
              </p>
              <button className="btn welcome-btn px-3 py-2 mt-2 rounded fs-4 text-light">
                Contact Us
              </button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 d-flex justify-content-center mt-sm-5">
            <div className="image text-center d-flex justify-content-center ">
              <img src={girl} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
