import * as React from "react";
import clsx from "clsx";
import * as _ from "lodash";

import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "../components/Button/button";
import ProductList from "../components/Product-List/product-list-components";
import { Form } from "../components/Form/form";
import logo from "../images/droppe-logo.png";
import intro1 from "../images/intro1.png";
import intro2 from "../images/intro2.png";
import styles from "./shopApp.module.css";
import * as Constants from "../constants";

interface IShopAppProps {
    products: any[];
    isOpen: boolean;
    isShowingMessage: boolean;
    message: string;
    numFavorites: number;
    prodCount: number;
}

export class ShopApp extends React.Component<{}, IShopAppProps> {
    constructor(props: any) {
        super(props);

        this.state = { products: [], isOpen: false, isShowingMessage: false, message: "", numFavorites: 0, prodCount: 0 };
    }

    componentDidMount() {
        fetch(Constants.API_PRODUCTS_LINK).then((response) => {
            let jsonResponse = response.json();

            jsonResponse.then((rawData) => {
                let productsResponse = Array.isArray(rawData) ? rawData : [];

                this.setState({
                    products: productsResponse,
                    prodCount: productsResponse.length,
                });
            });

            jsonResponse.catch(() => {
                console.log("Api Call Issue");
            });
        });
    }

    favClick = (title: string) => {
        const { products, numFavorites } = this.state;

        let cProducts = _.clone(products);
        const idx = _.findIndex(cProducts, { title: title });
        let currentFavs = numFavorites;
        let totalFavs: any;

        if (cProducts[idx].isFavorite) {
            cProducts[idx].isFavorite = false;
            totalFavs = --currentFavs;
        } else {
            totalFavs = ++currentFavs;
            cProducts[idx].isFavorite = true;
        }

        this.setState({ products: cProducts, numFavorites: totalFavs });
    };

    onSubmit = (payload: { title: string; description: string; price: string }) => {
        const { products } = this.state;
        const updated = _.clone(products);

        updated.push({
            title: payload.title,
            description: payload.description,
            price: payload.price,
        });

        this.setState({
            products: updated,
            prodCount: _.size(products) + 1,
            isOpen: false,
            isShowingMessage: true,
            message: Constants.ADDING_PRODUCT,
        });

        // **this POST request doesn't actually post anything to any database**
        fetch(Constants.API_PRODUCTS_LINK, {
            method: "POST",
            body: JSON.stringify({
                title: payload.title,
                price: payload.price,
                description: payload.description,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isShowingMessage: false,
                    message: "",
                });
            });
    };

    closeModal = () => {
        this.setState({
            isOpen: false,
        });
    };

    openModal = () => {
        this.setState({
            isOpen: true,
        });
    };

    render() {
        const { products, isOpen, isShowingMessage, message, prodCount, numFavorites } = this.state;

        return (
            <React.Fragment>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.headerImageWrapper}>
                            <img src={logo} className={styles.headerImage} />
                        </div>
                    </div>

                    <>
                        <span className={clsx(styles.subContainer, styles.logoImageContainer)}>
                            <img src={intro1} className={styles.logo1} />
                            <img src={intro2} className={styles.logo2} />
                        </span>
                    </>

                    <div className={styles.productsFullContainer}>
                        <div className={styles.buttonWrapper}>
                            <span role="button">
                                <Button
                                    onClick={() => {
                                        this.openModal();
                                    }}
                                >
                                    {Constants.SEND_PRODUCT_PROPOSAL}
                                </Button>
                            </span>
                            {isShowingMessage && (
                                <div className={styles.messageContainer}>
                                    <i>{message}</i>
                                </div>
                            )}
                        </div>

                        <div className={styles.statsContainer}>
                            <span>
                                {Constants.TOTAL_PRODUCTS} {prodCount}
                            </span>
                            {" - "}
                            <span>
                                {Constants.NUMBER_OF_FAVORITES} <span className="favouriteCount">{numFavorites}</span>
                            </span>
                        </div>
                        {products && !!products.length && <ProductList products={products} onFav={(title: string) => this.favClick(title)} />}
                    </div>
                </div>

                <>
                    <Modal isOpen={isOpen} className={styles.reactModalContent} overlayClassName={styles.reactModalOverlay}>
                        <div className={styles.modalContentHelper}>
                            <div
                                className={styles.modalClose}
                                onClick={() => {
                                    this.closeModal();
                                }}
                            >
                                <FaTimes />
                            </div>

                            <Form on-submit={(payload) => this.onSubmit(payload)} />
                        </div>
                    </Modal>
                </>
            </React.Fragment>
        );
    }
}
