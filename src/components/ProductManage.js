import React, { Component } from 'react';
import '../App.css';
import FormManage from './FormManage';
import Search from './Search';
import ProductListManage from './ProductListManage';
import { ProductConsumer } from '../context';
import { Link, Redirect } from 'react-router-dom';
class ProductManage extends Component {

  constructor(props) {
    super(props)
    const token = localStorage.getItem('token')
   
    let loggedIn = true
    if (token == null) {
      loggedIn = false

    }
    this.state = {
      loggedIn
    }
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />
    }

    
    return (
      <ProductConsumer>
        {value => {
          {if(value.keyword){
            value.products = value.products.filter(product =>{
              return product.name.toLowerCase().indexOf(value.keyword) !== -1
            })
          }}
          return (
            <div className="container">
              <div className="text-center">
                <h1>Quản Lý Sản Phẩm</h1>
                <hr />
              </div>
              <div className="row">
                <div className={value.isDisplayForm ? 'col-xs-4' : ''}>
                  {value.isDisplayForm ? <FormManage onCloseForm={value.onCloseForm} productUpdating={value.productUpdating} /> : ''};
              </div>
                <div className={value.isDisplayForm ? 'col-xs-8' : 'col-xs-12'}>
                  <button type="button" className="btn btn-primary" onClick={value.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Sản Phẩm
                      </button>
                  <button type="button" className="btn btn-danger ml-5" onClick={value.onGenerateData}>
                    Generate Data
                      </button>
                      <Link to="/logout">
                      <button type="button" className="btn btn-danger ml-5">
                    Logout
                      </button>
                      </Link>
                      
                  <div className="row mt-15">
                    <Search/>
                   
                  </div>
                  <ProductListManage />
                </div>
              </div>
            </div>
          )
        }}
      </ProductConsumer>


    );
  }
}

export default ProductManage;