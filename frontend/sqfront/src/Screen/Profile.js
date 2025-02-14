import React, { useState, useRef, useEffect } from "react";
// import image from "../Image/avatar.jpeg";
import { useCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import logo from "../UploadOutlined.svg";

const Profile = () => {
  const [projectlist, setProjectlist] = useState([]);
  const [Profobj, setProfobj] = useState({})
  const [name, setName] = useState("");
  const [putdatadb, setputdatadb] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    axios
      .get(`https://squddle-backend.onrender.com/api/v1userinfo?email=${cookies.email}`)
      .then((res) => {
        if (res.data) {
          setUserdata(res.data);
          console.log(res.data);
        }
      });
  }, []);

  const areaofinterestselect = (e) => {
    console.log(e);
    setProfobj({
      ...Profobj,
      role: e,
    });
    // console.log(Profobj);
  };
  const profinitialization = (e) => {
    const r = e.target.name;
    const s = e.target.value;
    // console.log(s)
    setProfobj({
      ...Profobj,
      [r]: s,
    });
    // console.log(Profobj)
  };
  const imageupload = (e) => {
    // const r = e.target.name
    // const s = e.target.files[0]
    // console.log("image upload")
    // setProfobj({
    //     ...Profobj,
    //     [r]: s
    // })
    // console.log(Profobj.image)
  };

  const deleteproject = (id) => {
    setProjectlist(projectlist.filter((pro) => pro.id !== id));
  };
  const textupdate = (e, ind) => {
    const { name, value } = e.target;
    // console.log({ name, value })
    let newprojectlist = [...projectlist];
    newprojectlist[ind][name] = value;
    setProjectlist(newprojectlist);
  };
  const editproject = (id) => {
    setProjectlist(
      projectlist.map((pro) => {
        if (pro.id === id) {
          return {
            ...pro,
            edit: false,
          };
        }
        return pro;
      })
    );
  };

  const submitproject = (id) => {
    setProjectlist(
      projectlist.map((pro) => {
        if (pro.id === id) {
          return {
            ...pro,
            edit: true,
          };
        }
        return pro;
      })
    );
  };

  const addProject = () => {
    setProjectlist((projectlist) => {
      return [
        ...projectlist,
        {
          id:
            projectlist.length === 0
              ? 1
              : projectlist[projectlist.length - 1].id + 1,
          title: "",
          groupsize: "",
          description: "",
          mentor: "",
          duration: "",
          link: "",
          repo: "",
          frameworks: "",
        },
      ];
    });
  };

  useEffect(() => {
    setProfobj({
      ...Profobj,
      projects: projectlist,
    });
    // console.log(projectlist)
  }, [projectlist]);

  const submitprofiledb = () => {
    axios
        .put(
          "https://squddle-backend.onrender.com/api/v1register",
          {
            ...Profobj,
            email: cookies.email,
          },
          { mode: "cors" },
          { withCredentials: true }
        )
        .then((res) => {
          // console.log()
          console.log(Profobj);
          console.log(res.data);
        });
        alert("Profile Updated Successfully");
  };

  useEffect(() => {
    if (putdatadb) {
      console.log("in api", Profobj)
     
    }
  }, [putdatadb]);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");


  const handleFile = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null)
    }
  }, [file]);

  useEffect(() => {
    console.log(image);
    setProfobj({
      ...Profobj,
      avatar: image,
    });
  
    console.log(Profobj.avatar);
    console.log(Profobj);
  }, [image]);

  const fileInputRef = useRef();
  const objectRef = useRef({});

  useEffect(() => {
   objectRef.current = Profobj;    
  });


  const handleUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };



  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {image ? (
              <img
                src={image} 
                style={{ objectFit: "cover", width: "130px", height: "130px", borderRadius: "50%" }}
                className="image-style align-content-center flex justify-content-center my-4 mx-3"
                alt="..."
              ></img>
            ) : (
              <div>
                <button style={{ width: "130px", height: "130px", borderRadius: "50%" }} onClick={handleUpload}>
                  <img src={logo} style={{ height: "20px", width: "20px" }} />
                  Upload Photo
                </button>
              </div>
            )}
            <input
              type="file"
              name=""
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFile}
              className="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
            />
          </div>

          <div className="col-md-4">
            <h5>Name: </h5>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(e)=>setName(e.target.value)}
              value={userdata.name ? userdata.name : Profobj.name}
              placeholder=""
            />
            <h5>University : </h5>
            <input
              type="text"
              className="form-control"
              name="university"
              onChange={profinitialization}
              value={
                userdata.university ? userdata.university : Profobj.university
              }
              placeholder=""
            />
            {/* <h4>Social URLs</h4> */}
            <h5>Linkedin : </h5>
            <input
              type="text"
              className="form-control"
              name="linkedinURL"
              onChange={profinitialization}
              value={
                userdata.linkedinURL
                  ? userdata.linkedinURL
                  : Profobj.linkedinURL
              }
              placeholder="Linkedin Url"
            />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <h5>Short Bio</h5>
            <div className="form-floating">
              <textarea
                className="form-control"
                name="bio"
                onChange={profinitialization}
                value={userdata.bio ? userdata.bio : Profobj.bio}
                placeholder=""
                id="floatingTextarea2"
                style={{ height: "110px" }}
              ></textarea>
              <label>Short Intro about yourself </label>
            </div>
            <h5>Twitter : </h5>
            <input
              type="text"
              className="form-control"
              name="twitterURL"
              onChange={profinitialization}
              value={
                userdata.twitterURL ? userdata.twitterURL : Profobj.twitterURL
              }
              placeholder=""
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <h5>Area of Interest</h5>
            <DropdownButton
              title={Profobj.role ? Profobj.role : userdata.role}
              id="dropdown-menu-align-right"
              onSelect={areaofinterestselect}
            >
              <Dropdown.Item eventKey="Frontend">Frontend</Dropdown.Item>
              <Dropdown.Item eventKey="Backend">Backend</Dropdown.Item>
              <Dropdown.Item eventKey="Data Science">
                Data Science
              </Dropdown.Item>
              <Dropdown.Item eventKey="Machine Learning">
                Machine Learning
              </Dropdown.Item>
              <Dropdown.Item eventKey="QA Testing">QA Testing</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="col-md-3">
            <h6>Industrial Experience </h6>
            <input
              type="text"
              className="form-control"
              name="experience"
              onChange={profinitialization}
              value={
                userdata.experience
                  ? userdata.experience
                  : Profobj.experience
              }
              placeholder="Title"
            />
          </div>
        </div>

        <h3>
          Projects
          <button
            type="button"
            onClick={addProject}
            className="mx-3 btn btn-primary"
          >
            Add Project
          </button>
        </h3>
        {projectlist.map((project, ind) => {
          return (
            <div key={ind}>
              <h2>
                Project {ind + 1}
                <button
                  type="button"
                  onClick={() => editproject(project.id)}
                  className="btn btn-secondary mx-3"
                  disabled={!project.edit}
                >
                  Edit{" "}
                </button>
                <button
                  type="button"
                  onClick={() => deleteproject(project.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </h2>
              <br />
              {
                <fieldset disabled={project.edit}>
                  <div className="row">
                    <div className="col-md-3">
                      <h6>Title</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.title}
                      />
                      <h6>Group Size</h6>
                      <input
                        type="number"
                        className="form-control"
                        name="groupsize"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.groupsize}
                        placeholder="Group Size"
                      />
                      <h6>Deployed Link (if any)</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="link"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.link}
                        placeholder="Link"
                      />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-md-4">
                      <h5>Description of Project and Outcomes</h5>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          name="description"
                          onChange={(e) => {
                            textupdate(e, ind);
                          }}
                          value={userdata.projects.description}
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: "100px" }}
                        ></textarea>
                        <label> Summary</label>
                      </div>

                      <h6>Github Repo</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="repo"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.repo}
                        placeholder="Github Repository"
                      />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-md-3">
                      <h6>Mentor of the Project</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="mentor"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.mentor}
                        placeholder="Mentor"
                      />
                      <h6>Duration of Project </h6>
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.duration}
                        placeholder="Duration"
                      />
                    </div>
                    <h6>Frameworks Used </h6>
                    <div className="form">
                      <input
                        type="text"
                        className="form-control"
                        name="frameworks"
                        onChange={(e) => {
                          textupdate(e, ind);
                        }}
                        value={userdata.projects.frameworks}
                        placeholder="Tech Stack used"
                      />
                    </div>
                  </div>
                  <br />
                </fieldset>
              }
              {/* <button type='submit' onClick={() => submitproject(project.id)} className='btn btn-primary' disabled={project.edit}>Submit</button > */}
            </div>
          );
        })}
        <button
          type="submit"
          onClick={submitprofiledb}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Profile;
