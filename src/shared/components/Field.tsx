interface Props {
    label?: string;
    value?: string;
    placeholder?: string;
    insertLabel?: boolean;
    onChange: (value: string) => void;
}

const Field = (props: Props) => (
    <div className="field">
        {props.label && <label>{props.label}</label>}
        <input
            type="text"
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange(e.target.value)}
        />
    </div>
);

export default Field;