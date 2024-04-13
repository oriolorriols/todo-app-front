import "./erase-column.scss";

function EraseColumn({activeColumn, changeModalStatus, deleteColumn}) {
    return(
        <>
        <div onClick={(e) => changeModalStatus(false, "column")} className="modal-backdrop" ></div>
        <div className="eraseboxColumn flex items-center justify-center">
            <div className="modal-body px-5">
                <h3 className="text-center mt-7 text-xl">Are you sure you want to</h3>
                <h3 className="text-center text-xl mb-1">erase <strong>this list</strong> and <strong>all it's content</strong>?</h3>
                
                <div className="text-center">
                    <button onClick={() => deleteColumn(activeColumn)} className="mx-7 mb-7 mt-5">Erase</button>
                    <button onClick={(e) => changeModalStatus(false, "column")} className="mr-7">Cancel</button>
                </div>
            </div>
            <div className="closeDiv" onClick={(e) => changeModalStatus(false, "column")}>
                <img src="/src/assets/close.svg" alt="" width="28px" height="28px"/>
            </div>
        </div>
        </>
    )
}
     




export default EraseColumn;