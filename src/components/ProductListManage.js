import React, { Component } from 'react';
import ProductItemManage from './ProductItemManage';
import {ProductConsumer} from '../context';
class ProductListManage extends Component {
    render() {
 
     
        return (
            <div className="row mt-15">
            <div className="col-12">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Company</th>
                            <th className="text-center">Desc</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductConsumer>
                            {value => {
                                return value.products.map((product,index) => {
                                    return (
                                        <ProductItemManage key={product.id} index={index} product={product}/>
                                    )
                                })
                            }}
                        </ProductConsumer>
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default ProductListManage;
