import React, { Component} from 'react';
import {detailProduct} from './data';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        productUpdating: null,
        isDisplayForm: false,
        keyword: '',
        cartSubTotal: 0,
        cartVAT: 0,
        cartTotal: 0
        
    }
    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => {
            {subTotal += item.total}
        })
        const tempVAT = subTotal * 0.1
        const VAT = parseFloat(tempVAT.toFixed(2))
        const total = subTotal + VAT
        this.setState(() => {
            return{
                cartSubTotal: subTotal,
                cartVAT: VAT,
                cartTotal: total
            }
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = parseFloat(price);
        this.setState(()=> {
            return {products: tempProducts, 
                cart: [...this.state.cart, 
                product]}
            }, this.addTotals);
    }
    onToggleForm = () => {
        if(this.state.isDisplayForm && this.state.productUpdating !== null){
            this.setState({ isDisplayForm: true, productUpdating: null});
        }
        else{
            this.setState({ isDisplayForm: !this.state.isDisplayForm, productUpdating: null});
        }
        
      }
      onCloseForm = () => {
        this.setState({ isDisplayForm: false});
      }
      onShowForm = () => {
        this.setState({ isDisplayForm: true});
      }
    componentDidMount() {
        this.setProducts();
   
    }
    search = keyword => {
        this.setState({
            keyword: keyword
        })
    }

    onSearch = ()=>{
      if(this.state.keyword){
          var {products} = this.state
          products.filter(product => {
              return product.name.toLowerCase().indexOf(this.state.keyword) !== -1
          })
      }
    }
    setProducts = () => {
        var storeProducts = Object.values(JSON.parse(localStorage.getItem('products')));
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];

        })
        this.setState(() => {
            return {products: tempProducts};
        })
    }
    onSubmit = (data) => {
        var {products} = this.state;
        if(data.id === ''){
            data.id = this.generateID();
            products.push(data);
        }
        else{
            let tempProducts = [...this.state.products];
            const index = tempProducts.indexOf(this.getItem(data.id));
            products[index] = data;   
        }
        localStorage.setItem('products', JSON.stringify(products))
        this.setState(() => {
            return {products: products, productUpdating: null};
        })
    }
 
   

    onDelete = (id) => {
        var {products} = this.state;
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products))
        this.setState(() => {
            return {products: products};
        })
    }
    onUpdate = (id) => {
        var {products} = this.state;
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        this.onShowForm();
        this.setState(() => {
            return {productUpdating:  products[index]};
        })
    }
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product}
        })
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
      }
  


    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen: true};
        })
    }
    closeModal = id => {
        this.setState(() => {
            return {modalOpen: false}
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count = product.count + 1
        product.total = product.count * product.price
        this.setState(()=>{
            return {
                cart: [...tempCart]

            }
        }, this.addTotals)
    }
    
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        if(product.count > 1){
            product.count = product.count - 1
        }
     
        
        product.total = product.count * product.price
        this.setState(()=>{
            return {
                cart: [...tempCart]

            }
        }, this.addTotals)
    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item.id !== id)
        const index = tempProducts.indexOf(this.getItem(id))
        let removeProduct = tempProducts[index]
        removeProduct.inCart = false
        removeProduct.total = 0
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, this.addTotals)
    }
    clearCart = () => {
       
        this.setState(() => {
            return {cart: []}
           
              
        }, this.setProducts, this.addTotals)
       
       
    }
   
    render(){
        return(
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                onSubmit: this.onSubmit,
                onDelete: this.onDelete,
                onUpdate: this.onUpdate,
                onToggleForm: this.onToggleForm,
                onCloseForm: this.onCloseForm,
                onShowForm: this.onShowForm,
                search: this.search,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};