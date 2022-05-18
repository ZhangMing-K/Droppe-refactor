import * as React from "react";
import { Button } from "../Button/button";
import styles from "./form.module.css";
import * as Constants from "../../constants";

type IFormPaylodProps = { title: string; description: string; price: string };
type IFormProps = {
    "on-submit": (payload: IFormPaylodProps) => void;
};

export const Form: React.FC<IFormProps> = (props) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const titleRef = React.useRef<HTMLInputElement>(null);
    const priceRef = React.useRef<HTMLInputElement>(null);
    const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!titleRef.current?.value) {
            alert(Constants.YOUR_PRODUCT_NEEDS_A_TITLE);
            return;
        }

        if (!descriptionRef.current?.value || !priceRef.current?.value) {
            alert(Constants.YOUR_PRODUCT_NEEDS_SOME_CONTENT);
            return;
        }

        props["on-submit"]({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
        });

        formRef.current?.reset();
    };

    return (
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
            <span className={styles.label}>{Constants.PRODUCT_TITLE}</span>

            <input ref={titleRef} placeholder={Constants.TITLE_PLACE_HOLDER} defaultValue="" className={styles.input} />

            <span className={styles.label}>{Constants.PRODUCT_DETAIL_LABEL}</span>

            <input ref={priceRef} placeholder={Constants.PRICE_PLACE_HOLDER} defaultValue="" className={styles.input} />

            <textarea ref={descriptionRef} placeholder={Constants.START_TYPING_PRODUCT_DESCRIPTION_HERE_PLACE_HOLDER} defaultValue="" className={styles.textarea} />

            <Button>{Constants.ADD_A_PRODUCT}</Button>
        </form>
    );
};
