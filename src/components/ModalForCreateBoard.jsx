import React from "react";

function ModalForCreateBoard(props) {
  return (
    <div
      className="modal d-block"
      id="modalForBoard"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      onClick={props.oncancelBoardBtn}
    >
      <div className="modal-dialog modal-sm">
        <div
          className="modal-content"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1587315119275-80455dfc9d64?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjcwNjZ9&quot)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            opacity: "0.7",
            width: "25em",
            height: "10em",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal-body" id="modalBodyForBoards">
            <input
              className="form-control mb-3"
              type="text"
              onChange={props.onInputText}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={props.onAddBoard}
            >
              Create Board
            </button>
            <button
              className="btn btn-cancel"
              type="button"
              onClick={props.oncancelBoardBtn}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalForCreateBoard;
