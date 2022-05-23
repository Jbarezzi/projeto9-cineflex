import Select from "./shared/Select";

export default function Success() {
    return(
        <Select success={true}>
            <p>Pedido feito<br />com sucesso!</p>
        </Select>
        
    );
}