const Footer = (props) => {
    const year = new Date().getFullYear()
    return(<>
        <div className="credits">Created and Maintained By Toby Frick {year}</div>
        </>
    )}

export default Footer