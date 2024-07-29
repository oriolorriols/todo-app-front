import "./erase-item.scss";

function EraseItem({item, changeModalStatus, eraseItem}) {
    return(
        <>
        <div onClick={(e) => changeModalStatus(false, "item")} className="modal-backdrop" ></div>
        <div className="erasebox flex items-center justify-center">
            <div className="modal-body">
                <h3 className="text-center mt-7 text-xl"><strong>Are you sure?</strong></h3>
                <button onClick={() => eraseItem(item)} className="mx-7 mb-7 mt-5">Erase</button>
                <button onClick={(e) => changeModalStatus(false, "item")} className="mr-7">Cancel</button>
            </div>
            <div className="closeDiv" onClick={(e) => changeModalStatus(false, "item")}>
                <img src="/src/assets/close.svg" alt="" width="28px" height="28px"/>
            </div>
        </div>
        </>
    )
}
     




export default EraseItem;