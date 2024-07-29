import "./full-item.scss";

function FullItem({item, changeModalStatus}) {
    return(
        <>
        <div onClick={(e) => changeModalStatus(false)} className="modal-backdrop" ></div>
        <div className="fullitem flex items-center justify-center">
            <div className="modal-body p-8">
                <input type="text"
                    value={item.title}
                    placeholder="Title"
                    onChange={ (e) => handleEditInputChange(e, item, 'title')}/>
                <textarea type="text"
                    value={item.description}
                    rows={item.description.length / 27}
                    placeholder="Description"
                    onChange={ (e) => handleEditInputChange(e, item, 'description')}/>
            </div>
            <button onClick={(e) => changeModalStatus(false)}>Close</button>
        </div>
        </>
    )
}
     




export default FullItem;