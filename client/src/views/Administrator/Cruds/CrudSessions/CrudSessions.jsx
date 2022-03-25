import { useState, useEffect } from 'react';
import styles from './CrudSessions.module.css';
import SearchContainer from '../../../../components/SearchContainer/SearchContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField } from '@material-ui/core';
import axios from 'axios';

import Swal from 'sweetalert2';
import zIndex from '@material-ui/core/styles/zIndex';


const Articles=[{
  Titulo:"Título" ,
  RangodeFecha:"Rango de Fecha",
  Descripcion:"Descripción",
  Estado:"Estado",
  
}]
/* toca conectar esto con la base de datos */
const Database=[{
	Titulo:"Titulo",
	RangodeFecha:"Rango de Fecha",
	Descripcion:"Descripcion",
	Estado:"Estado",
},
{
	Titulo:"Titulo" ,
	RangodeFecha:"Rango de Fecha",
	Descripcion:"Descripcion",
	Estado:"Estado",
},
{
	Titulo:"Titulo" ,
	RangodeFecha:"Rango de 888Fecha",
	Descripcion:"Descripcion",
	Estado:"Estado",
},
{
	Titulo:"Titulo" ,
	RangodeFecha:"Rango de Fecha",
	Descripcion:"Descripcion",
	Estado:"Estado",
},
{
	Titulo:"Titulo" ,
	RangodeFecha:"Rango de Fecha",
	Descripcion:"Descripcion",
	Estado:"Estado",
}
]


//Modal styles 
const useStyles = makeStyles((theme) => ({
	modal: {
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
	},
	h3: {
		fontFamily: 'Gilroy-ExtraBold ',
		color: '#92C149',
	},
	Button: {
		backgroundColor: '#FFCC02',
		color: '#010101',
		margin: '0rem 0.5rem 0rem 0rem',
		'&:hover': {
			backgroundColor: '#92C149',
		},
	},
}));

const CrudSessions = () => {
	const [data, setData] = useState([]);
	const Styles = useStyles();
	const [modalinsertar, setmodalinsertar] = useState(false);
	const [modaleditar, setmodaleditar] = useState(false);
	//Insert saved module data
	const [SavedData, setSavedData] = useState({
		id: '',
		Nombres: '',
		Apellidos: '',
		Edad: '',
		Género: '',
		Intereses: '',
		Programa: '',
		Carrera: '',
		Empresa: '',
		AsignaciónEst: '',
	});
	//Function to insert the data written in the module.
	const InsertData = (e) => {
		const { name, value } = e.target;
		setSavedData((prevState) => ({
			...prevState,
			[name]: value,
		}));
		console.log(SavedData);
	};
	//function that searches the database for data
	/*const petitionGet=async()=>{
 await axios.get(Database)
  .then(response=>{
    console.log(response.data)
  })
}
useEffect(async()=>{
 await petitionGet();
},[])



//function that inserts data into the database

/*const petitionPost=async()=>{
  await axios.post(Database,SavedData)
  .then(response=>{
    setData(data.concat(response.data),
    openedClosedModalInsertar()
  )
  })
}*/

	//one-button boolean function
	const openedClosedModalInsertar = () => {
		setmodalinsertar(!modalinsertar);
	};
	//one-button boolean function
	const openedClosedModalEditar = () => {
		setmodaleditar(!modaleditar);
	};

	//------------------------------------------ alert--------------------------------------------------
	const mostrarAlerta = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'black',
			cancelButtonColor: 'pink',
			confirmButtonText: 'Yes, delete it!',
			zIndex: '2147483647 '
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire('Deleted!',	'Your file has been deleted.','success')
			  openedClosedModalEditar()
			}
			
		  })
};

	//Modal structure Insertar

	const bodyInsertar = (
		<div className={styles.modal}>
			<h3 className={styles.h3}>AÑADIR UNA SESION</h3>
			<TextField
				name="Titulo"
				className={Styles.inputMaterial}
				label="Titulo"
				onChange={InsertData}
				value={SavedData && SavedData.Titulo}
			/>
			<br />
			<TextField
			    type="date"
				name="Rango de fecha"
				className={Styles.inputMaterial}
				label="Rango de fecha"
				onChange={InsertData}
				value={SavedData && SavedData.Rangodefecha}
			/>
			<br />
			<TextField
				name="Descripcion"
				className={Styles.inputMaterial}
				label="Descripción"
				onChange={InsertData}
				value={SavedData && SavedData.Descripcion}
			/>
			<br />
			{/* <TextField
				name="Género"
				className={Styles.inputMaterial}
				label="Estado"
				onChange={InsertData}
				value={SavedData && SavedData.Nombres}
			/> */}
			<br />
			<select type='text'>
			    <option value="0">Estado</option>
				<option value="Habilitado">Habilitado</option>
				<option value="Deshabilitado">Deshabilitado</option>

			</select>
			<br />
			<div align="center" >
				<button className={styles.button} /* onClick={()=>petitionPost()}*/>
					Insertar
				</button>
				<button
					className={styles.button}
					onClick={() => openedClosedModalInsertar()}
				>
					Cancelar
				</button>
			</div>
		</div>
	);
	const bodyEditar = (
		<div className={styles.modal}>
			<h3 className={styles.h3}>EDITAR SESIÓN</h3>
			<TextField
				name="Titulo"
				className={Styles.inputMaterial}
				label="Titulo"
				onChange={InsertData}
				value={SavedData && SavedData.Titulo}
			/>
			<br />
			<TextField
			     type="date"
				name="Rango de fecha"
				className={Styles.inputMaterial}
				label=""
				onChange={InsertData}
				value={SavedData && SavedData.RangodeFecha}
			/>
			<br />
			<TextField
				name="Descripcion"
				className={Styles.inputMaterial}
				label="Descripción"
				onChange={InsertData}
				value={SavedData && SavedData.Descripcion}
			/>
			<br />
			{/* <TextField
				name="Género"
				className={Styles.inputMaterial}
				label="Estado"
				onChange={InsertData}
				value={SavedData && SavedData.Nombres}
			/> */}
			<br />
			<select type='text'>
			    <option value="0">Estado</option>
				<option value="Habilitado">Habilitado</option>
				<option value="Deshabilitado">Deshabilitado</option>

			</select>
			<br />
			<div align="center" >
				<button className={styles.button} onClick={() => mostrarAlerta()}>
					Guardar cambios
				</button>
				<button
					className={styles.button}
					onClick={() => openedClosedModalEditar()}
				>
					Cancelar
				</button>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<SearchContainer
				h1={'DETALLE DE SESIONES '}
				placeholder={'Buscar Sesión'}
				button={'Insertar Sesión'}
				onClick={() => openedClosedModalInsertar()}
			/>
			<div class={styles.containerTable}>
				<table className={styles.table}>
					<thead>
				{Articles.map((e) => {
					return (
						<tr>
							
							<th>{e.Titulo}</th>
							<th>{e.RangodeFecha}</th>
							<th>{e.Descripcion}</th>
							<th>{e.Estado}</th>
							<th>Acciones</th>
							
						</tr>
					);
				})}

					</thead>
					<tbody>
				{Database.map((e) => {
					return (
						<tr>
							<td>{e.Titulo}</td>
							<td >{e.RangodeFecha}</td>
							<td > {e.Descripcion}</td>
							<td >{e.Estado}</td>

							<>
								<td>
								<div className={styles.containerbutton}>
									<button id={styles.update} onClick={() => openedClosedModalEditar()}>
										<FontAwesomeIcon icon={faEdit} />
									</button>
									{/* <button id={styles.delete}>
										<FontAwesomeIcon icon={faTrashAlt} />
									</button> */}
									</div>
								</td>
								
							</>
						</tr>
					);
				})}
				</tbody>
			</table>
			</div>
			<Modal open={modalinsertar} onClose={openedClosedModalInsertar}>
				{bodyInsertar}
			</Modal>
			<Modal open={modaleditar} onClose={openedClosedModalEditar}>
				{bodyEditar}
			</Modal>
			
		</div>
	);
};

export default CrudSessions;
