export default function DisplayAlert(props){
    if(props.status==="danger"){
        return(
            <div>
                <div className="alert alert-danger alert-dismissible fade show"><strong>{props.type} </strong>{props.mes}</div>
            </div>
        )
    }else if(props.status==="warning"){
        return(
            <div>
                <div className="alert alert-warning alert-dismissible"><strong>{props.type} </strong>{props.mes}</div>
            </div>
        )
    }else if(props.status==="success"){
        return(
            <div>
                <div className="alert alert-success alert-dismissible"><strong>{props.type} </strong>{props.mes}</div>
            </div>
            )
    }else{

    }
}