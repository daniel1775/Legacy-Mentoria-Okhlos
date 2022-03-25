import { useState, useEffect } from "react";
import styles from "./Style.module.css";
import SearchContainer from "../../../../components/SearchContainer/SearchContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core";
import Axios from "axios";

const Articles = [
  {
    name: "Nombres",
    Surnames: "Apellidos",
    Age: "Edad",
    Gender: "Género",
    Interests: "Intereses",
    Program: "Programa",
    MentorAssignment: "Id Mentor",
  },
];

//Modal styles
const useStyles = makeStyles((theme) => ({
  /*modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  iconos: {
    cursor: 'pointer',
  },
  inputMaterial: {
    width: '100%',
    height: '2.5rem',
  },
  h3: {
    fontFamily: 'Gilroy-ExtraBold ',
    color: '#92C149',
    margin: '0',
  },
  Button: {
    backgroundColor: '#FFCC02',
    color: '#010101',
    margin: '0rem 0.5rem 0rem 0rem',
    '&:hover': {
      backgroundColor: '#92C149',
    },
  },*/
  modal: {
    position: "absolute",
    maxWidth: 600,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  TextField: {
    display: "inline-block",
  },

  iconos: {
    cursor: "pointer",
    backgroundcolor: "blue",
  },
  inputMaterial: {
    width: "100%",
    height: "2.5rem",
  },
  h3: {
    fontFamily: "Gilroy-ExtraBold ",
    color: "#4caf50",
    margin: "0",
  },
  Button: {
    backgroundColor: "#ffdf5f",
    color: "#010101",
    margin: "0rem 0.5rem 0rem 0rem",
    "&:hover": {
      backgroundColor: "#FFCC02",
    },
  },
}));

const CrudStudents = () => {
  const [data, setData] = useState([]);
  const Styles = useStyles();
  const [modalinsertar, setmodalinsertar] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  //Insert saved module data
  const [SavedData, setSavedData] = useState({
    name: "",
    middleName: "",
    lastName: "",
    secondSurname: "",
    actualAge: "",
    gender: "",
    program: "",
    email: "",
    contactNumber: "",
    cohorte: "",
    role: 1,
  });
  //base Url of deploy
  const baseUrl = "http://localhost:3001";
  //Function to insert the data written in the module.
  const InsertData = (e) => {
    const { name, value } = e.target;
    setSavedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(SavedData);
  };

  const [students, setStudents] = useState([]);

  useEffect(() => {
    Axios({
      url: `${baseUrl}/api/students/control`,
    })
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setStudents]);

  //function that inserts data into the database

  const petitionPost = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${baseUrl}/api/students-control-post`, {
        gender: SavedData.gender,
        actualAge: SavedData.actualAge,
        name: SavedData.name,
        middleName: SavedData.middleName,
        lastName: SavedData.lastName,
        secondSurname: SavedData.secondSurname,
        email: SavedData.email,
        password: SavedData.password,
        contactNumber: SavedData.contactNumber,
        role: SavedData.role,
        cohorte: SavedData.cohorte,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //one-button boolean function
  const openedClosedModalInsertar = () => {
    setmodalinsertar(!modalinsertar);
  };

  //Modal structure Insertar

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3 className={styles.h3}>AGREGAR NUEVO ESTUDIANTE </h3>
      <br />
      <div className="row ">
        <div className="form-group col-md-6">
          <TextField
            name="id"
            className={Styles.inputMaterial}
            label="id"
            onChange={InsertData}
          />
          <br />
        </div>
        <div className="form-group col-md-6">
          <TextField
            name="name"
            className={Styles.inputMaterial}
            label="Primer Nombre"
            onChange={InsertData}
          />

          <br />
        </div>
      </div>
      <div className="row ">
        <div className="form-group col-md-6">
          <TextField
            name="middleName"
            className={Styles.inputMaterial}
            label="Segundo Nombre"
            onChange={InsertData}
          />
          <br />
        </div>


        <div className="form-group col-md-6">
          <TextField
            name="lastName"
            className={Styles.inputMaterial}
            label="Primer Apellido"
            onChange={InsertData}
          />
          <br />
        </div>
      </div>
      <div className="row ">
        <div className="form-group col-md-6">
          <TextField
            name="secondSurname"
            className={Styles.inputMaterial}
            label="Segundo apellido"
            onChange={InsertData}
          />
          <br />
        </div>
        <div className="form-group col-md-6">
          <TextField
            name="actualAge"
            className={Styles.inputMaterial}
            label="Edad"
            onChange={InsertData}
          />
          <br />
        </div>
      </div>
      <div className="row ">


        <div className="form-group col-md-6">
          <TextField
            name="gender"
            className={Styles.inputMaterial}
            label="Género"
            onChange={InsertData}
          />
          <br />
        </div>
        <div className="form-group col-md-6">
          <TextField
            name="programa"
            className={Styles.inputMaterial}
            label="Programa"
            onChange={InsertData}
          />
          <br />
        </div>
      </div>
      <div className="row ">

        <div className="form-group col-md-6">
          <TextField
            name="email"
            className={Styles.inputMaterial}
            label="E-mail"
            onChange={InsertData}
          />
          <br />
        </div>
        <div className="form-group col-md-6">
          <TextField
            name="contactNumber"
            className={Styles.inputMaterial}
            label="Celular"
            onChange={InsertData}
          />
          <br />
        </div>
      </div>
      <div className="row ">

        <div className="form-group col-md-6">
          <TextField
            name="cohorte"
            className={Styles.inputMaterial}
            label="cohorte"
            onChange={InsertData}
          />
          <br />
        </div>
        <div className="form-group col-md-6">
          <TextField
            name="password"
            className={Styles.inputMaterial}
            label="Contraseña"
            onChange={InsertData}
          />
        </div>
      </div>



      <br />
      <br />
      <div align="center">
        <Button className={Styles.Button} onClick={petitionPost}>
          Insertar
        </Button>
        <br />

        <Button
          className={styles.Button}
          onClick={() => openedClosedModalInsertar()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <h1>TABLA CONTROL ESTUDIANTES</h1>
        <div className={styles.header}>
          <input type="search" placeholder="Busca un Estudiante" />
          <button onClick={() => openedClosedModalInsertar()}>
            Insertar Estudiante
          </button>

          <button>Insertar SVC</button>
          <button>Descargar SVC</button>
        </div>

        <div class={styles.containerTable}>
          <table className={styles.table}>
            <thead>
              {
                <tr>
                  <th>id</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Edad</th>
                  <th>Genero</th>
                  <th>Intereses</th>
                  {/* <th>Programa</th> */}
                  <th>Mentor</th>
                  <th>Acciones</th>
                </tr>
              }
            </thead>
            <tbody>
              {students.map((e) => {
                return (
                  <tr>
                    <td>{e.user_id.id}</td>
                    <td>{e.user_id.name + " " + e.user_id.middleName}</td>
                    <td>
                      {e.user_id.lastName + " " + e.user_id.secondSurname}
                    </td>
                    <td>{e.actualAge}</td>
                    <td>{e.gender}</td>
                    <td>
                      {e.interestsStudent[0] +
                        " " +
                        e.interestsStudent[1] +
                        " " +
                        e.interestsStudent[2]}
                    </td>
                    {/* <td>{e.user_id.program }</td> */}
                    <td>{e.assignedMentor}</td>
                    <td>
                      <div className={styles.containerbutton}>
                        <button id={styles.update}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>{" "}
                        <button id={styles.delete}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal open={modalinsertar} onClose={openedClosedModalInsertar}>
          {bodyInsertar}
        </Modal>
      </div>
    </>
  );
};

export default CrudStudents;
