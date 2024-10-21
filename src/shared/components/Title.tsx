interface Props {
    label: string;
}

export const Title = (props: Props) => (
    <h1>{props.label}</h1>
);