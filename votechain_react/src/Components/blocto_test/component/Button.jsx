import "../styles.css"
export default function BloctoButton({ children, onClick }) {
    return (
        <button className="btn hero-page-btn" onClick={onClick}>
            <span>{children}</span>
        </button>
    )
}
