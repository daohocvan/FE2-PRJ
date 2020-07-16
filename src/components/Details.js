import React, {Component} from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
class Details extends Component {
  render(){
    return( 
    <ProductConsumer>
     {value => {
       const {id, title, company, img, info, price, inCart} =  value.detailProduct;
       return (
        <div className="container py-5">
        {/* title */}
     
        {/* end of title */}
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <img src={img} className="img-fluid" alt="" style={{width: 200 + 'px'}, {height: 400 + 'px'}} />
          </div>
          {/* prdoduct info */}
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h1>{title}</h1>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              Company: <span className="text-uppercase">{company}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                Price : <span>$</span>
                {price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              Some info about product :
            </p>
            <p className="text-muted lead">{info}</p>
            {/* buttons */}
            <div>
              <Link to="/">
                <ButtonContainer>Back to products</ButtonContainer>
              </Link>
              <ButtonContainer
                cart
                disabled={inCart ? true : false}
                onClick={() => {
                  value.addToCart(id);
                  value.openModal(id);
                }}
              >
                {inCart ? "In cart" : "Add to cart"}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </div>
       ) 
     }}
    </ProductConsumer>)
  }
}

export default Details;