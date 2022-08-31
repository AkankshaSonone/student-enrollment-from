import React from 'react';

export default function Table(props) {

    return (

        <table className="table table-bordered" style={{ marginTop: "0", marginBottom: "0" }}>
            {(props.student.sno === 1) ? (<thead className='text-center' style={{backgroundColor:"#123456", color:"whitesmoke"}}>
                <tr>
                    <th scope="col" style={{ width: "65%" }}>Student Details</th>
                    <th scope="col">Image</th>
                </tr>
            </thead>) : null}
            <tbody>
                <tr>
                    <td style={{ width: "65%" }}>
                        <ul style={{ listStyleType: "none", padding: "5px" }}>
                            <li><strong>{props.student.name}</strong></li>
                            <li>{props.student.gender}</li>
                            <li>{props.student.email}</li>
                            <li><a href={props.student.url} target="_blank" rel="noreferrer">{props.student.url}</a></li>
                            <li>{props.student.skills.map((skill, index) => {
                                return <div key={index}>{skill} </div>;
                            })}</li>
                        </ul>
                    </td>
                    <td style={{ textAlign: "center"}}>
                        <img src={props.student.image} alt={props.student.image} />
                        <button className="btn btn-outline-danger my-2" onClick={() => { props.deleteRecord(props.student) }} >Delete</button>
                    </td>
                </tr>
            </tbody>
        </table >

    )

}