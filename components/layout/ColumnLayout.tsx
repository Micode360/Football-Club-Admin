
interface alignProperties {
    children: React.ReactNode;
    style?:string;
}


export default function ColumnLayout ({ children, style }:alignProperties) {
    return (
    <div className={`flex flex-col items-center justify-center ${style}`}>
        { children }
    </div>
    );
}