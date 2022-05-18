import * as React from "react";
import clsx from "clsx";
import { FaStar } from "react-icons/fa";
import styles from "./product.module.css";
import * as Constants from "../../constants";

interface IProductProps {
    index: number;
    product: { title: string; description: string; price: number; isFavorite: boolean; rating: { rate: number; count: number } };
    onFav: (title: string) => void;
}

export const Product: React.FC<IProductProps> = ({ product, onFav, index }) => {
    // Problem: Now product title can be too long, I just put overflowX as fix now
    const productRate = product.rating ? `${product.rating.rate}/5` : "";
    return (
        <div className={styles.productItemContainer}>
            <div className={styles.productTitle}>{product.title}</div>

            <div>
                <strong>
                    {Constants.RATING} {productRate}
                </strong>
            </div>

            <div>
                <b>
                    {Constants.PRICE} ${+product.price}
                </b>
            </div>

            <div className={styles.productBody}>
                <div>
                    <b>{Constants.DESCRIPTION}</b>
                </div>

                {product.description}
            </div>

            <span className={styles.actionBar}>
                <div
                    className={clsx(styles.actionBarItem, product.isFavorite && styles.active, "favoriteButton")}
                    role="button"
                    onClick={() => {
                        onFav(product.title);
                    }}
                >
                    <FaStar /> <span className={styles.actionBarItemLabel}>{!!!!product.isFavorite ? Constants.REMOVE_FROM_FAVORITES : Constants.ADD_TO_FAVORITES}</span>
                </div>
            </span>
        </div>
    );
};
