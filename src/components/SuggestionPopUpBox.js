import { Tooltip } from "react-tooltip";
import "./SuggestPopUpBox.css";

function TriggerRendererProp({ children, title }) {
  return (
    <>
      <span id="not-clickable">{children}</span>
      <Tooltip anchorSelect="#not-clickable" className="suggestionPopUpBox">
        {title}
      </Tooltip>
    </>
  );
}

export default TriggerRendererProp;
