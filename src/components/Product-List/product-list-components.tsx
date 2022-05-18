import * as React from "react";
import * as _ from "lodash";
import { Product } from "../Product/product";

interface IProductListProps {
    products: any[];
    onFav: (title: string) => void;
}

export default class ProductList extends React.Component<IProductListProps, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        const { products } = this.props;

        return (
            <div className="productList">
                {products.length > 0 &&
                    _.reverse(products).map((item, index) => {
                        return <Product key={index} index={index} product={item} onFav={this.props.onFav} />;
                    })}
            </div>
        );
    }
}
