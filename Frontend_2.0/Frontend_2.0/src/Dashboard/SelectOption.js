export default function SelectOption(props) {
  return (
    <select id={props.id} name={props.name} className="form-select">
      {props.array.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}
