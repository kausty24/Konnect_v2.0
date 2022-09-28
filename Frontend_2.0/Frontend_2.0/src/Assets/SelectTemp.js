
function SelectTemp(props) {

    return(
        <div className="col-auto">
            <select name={props.name} id={props.name}>
                {
                    props.list.options.map(elem => 
                        <option value={elem}>{elem}</option>
                    )
                }
                
            </select>
        </div>
    )
}

export default SelectTemp