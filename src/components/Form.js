import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Form() {
    const labelStyle = {
        width: "30%",
        display: "inline-block",
        float:"left"
    }
    const inputStyle = {
        width: "70%",
        display: "inline-block"
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [gender, setGender] = useState("");
    const skills_list = [
        {
            name: "Python",
        },
        {
            name: "HTML",
        },
        {
            name: "ReactJS",
        },
    ];
    const [skills, setSkills] = useState(new Array(skills_list.length).fill(null));

    let initStudents;
    if (localStorage.getItem("students") === null) {
        initStudents = [];
    }
    else {
        initStudents = JSON.parse(localStorage.getItem("students"));
    }

    const [students, setStudents] = useState(initStudents);
    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students])

    const addStudent = (name, email, url, image, gender, skills) => {
        let sno;
        if (students.length === 0) {
            sno = 1;
        }
        else {
            sno = students[students.length - 1].sno + 1;
        }
        const newStudent = {
            sno: sno,
            name: name,
            email: email,
            url: url,
            image: image,
            gender: gender,
            skills: skills,
        }
        setStudents([...students, newStudent]);
    }
    const handleCheckbox = (position) => {
        const updatedSkills = skills.map((skill, index) =>
            index === position
                ? index === 0
                    ? skill === "Python"
                        ? null
                        : "Python"
                    : index === 1
                        ? skill === "HTML"
                            ? null
                            : "HTML"
                        : skill === "ReactJS"
                            ? null
                            : "ReactJS"
                : skill
        );
        setSkills(updatedSkills);
    };
    const submit = (e) => {
        e.preventDefault();     // prevents page from reloading
        if (!name || !email || !url || !image || !gender || skills === []) {
            alert("Please fill out all the details before submitting.")
        }
        else {
            addStudent(name, email, url, image, gender, skills);
            handleClear();
        }
    }

    const handleClear = () => {
        setName("");
        setEmail("");
        setUrl("");
        setImage("");

        setGender("");
        // Clearing radio buttons
        let ele = document.getElementsByName("gender");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;

        setSkills(new Array(skills_list.length).fill(null));
        // Clearing checkboxes
        ele = document.getElementsByName("skill");
        for (i = 0; i < ele.length; i++)
            ele[i].checked = false;
    }
    const deleteRecord = (student) => {
        if (window.confirm(`Press OK to confirm delete ${student.name}'s record.`)) {
            setStudents(students.filter((e) => {
                return e !== student;
            }));
            localStorage.setItem("students", JSON.stringify(students));
        }
    }


    return (
        <>

            <div className='container my-5'>
                <form className='px-3' style={{ backgroundColor: "white", display: "inline-block", width: "50%", float: "left", borderRadius:"10px" }} onSubmit={submit}>
                    <h2 className='py-3 text-center'>STUDENT ENROLLMENT FORM</h2>
                    <div className="mb-3">
                        <label htmlFor='name' className="form-label" style={labelStyle}>Name:</label>
                        <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} style={inputStyle} id="name" value={name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={labelStyle}>Email address:</label>
                        <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} style={inputStyle} id="email" value={email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='url' className="form-label" style={labelStyle}>Website URL:</label>
                        <input type="text" className="form-control" onChange={(e) => { setUrl(e.target.value) }} style={inputStyle} id="url" value={url} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='image' className="form-label" style={labelStyle}>Image Link:</label>
                        <input type="text" className="form-control" onChange={(e) => { setImage(e.target.value) }} style={inputStyle} id="image" value={image} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" style={labelStyle}>Gender:</label>
                        <div style={{ width: "70%", display: "inline-block" }}>
                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => { setGender(e.target.value) }} type="radio" name="gender" id="Male" value="Male" />
                                <label className="form-check-label" htmlFor="Male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => { setGender(e.target.value) }} type="radio" name="gender" id="Female" value="Female" />
                                <label className="form-check-label" htmlFor="Female">
                                    Female
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => { setGender(e.target.value) }} type="radio" name="gender" id="Other" value="Other" />
                                <label className="form-check-label" htmlFor="Other">
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                    <div style={labelStyle}>Skills:</div>
                    <div className="row px-3" style={inputStyle}>
                        <div className="form-check form-check-inline col-md-3">
                            <input className="form-check-input" name='skill' onChange={() => handleCheckbox(0)} type="checkbox" id="inlineCheckbox1" value="Python" />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">Python</label>
                        </div>
                        <div className="form-check form-check-inline col-md-3">
                            <input className="form-check-input" name='skill' onChange={() => handleCheckbox(1)} type="checkbox" id="inlineCheckbox2" value="HTML" />
                            <label className="form-check-label" htmlFor="inlineCheckbox2">HTML</label>
                        </div>
                        <div className="form-check form-check-inline col-md-3">
                            <input className="form-check-input" name='skill' onChange={() => handleCheckbox(2)} type="checkbox" id="inlineCheckbox3" value="ReactJS" />
                            <label className="form-check-label" htmlFor="inlineCheckbox3">ReactJS</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-primary my-3" style={{ display: "inline-block" }}>Enroll Student</button>
                    <button type="button" className="btn btn-outline-danger mx-3" onClick={handleClear}>Clear</button>
                </form>
                {/* <div className=" mx-5 vr" style={{ width: "2px ", height: "475px", display:"inline-block", opacity: "100%", backgroundColor: "#0F0326", float:"left" }}></div> */}
                <Sidebar students={students} deleteRecord={deleteRecord} />
            </div>
        </>
    )

}