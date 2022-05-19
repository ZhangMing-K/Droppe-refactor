import * as React from "react";
import styles from "./button.module.css";

interface IButtonProps {
    children: any;
    onClick?: () => void;
    dataTestId: String;
}

export const Button: React.FC<IButtonProps> = ({ children, onClick, dataTestId }) => (
    <button className={styles.button} onClick={onClick} data-test={dataTestId}>
        {children}
    </button>
);
