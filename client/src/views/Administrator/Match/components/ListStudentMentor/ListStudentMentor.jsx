
import style from './ListStudentMentor.module.css';

import Sidebar from '../../../../../components/Sidebar/Sidebar';

export default function ListStudentMentor(props) {
	const {students, mentors, done, match, calculateMatch} = props;

	return (
		<div>
			{/* <Sidebar /> */}
			<div className={style.container}>
				<h2 className="listStudent-title">Lista de Estudiantes</h2>
				<table>
					<tr className="listStudent-tr">
						<th className="listStudent-th">id </th>
						<th className="listStudent-th">Nombre</th>
						<th className="listStudent-th">Apellido</th>
					</tr>

					{students.map((e, index) => {
						return (
							<tr className="listStudent-tr-map" key={e.id}>
								<td className="td-number">{index + 1}</td>
								<td className="td-data">{e.user_id.name}</td>
								<td className="td-data">{e.user_id.lastName}</td>
							</tr>
						);
					})}
				</table>
			</div>
			<div className="listStudent-Container">
				<h2 className="listStudent-title mg-top">Lista de Mentores</h2>
				<table>
					<tr className="listStudent-tr">
						<th className="listStudent-th"> </th>
						<th className="listStudent-th">Nombre</th>
						<th className="listStudent-th">Apellido</th>
					</tr>

					{mentors.map((e, index) => {
						return (
							<tr className="listStudent-tr-map" key={e.id}>
								<td className="td-number">{index + 1}</td>
								<td className="td-data">{e.user_id.name}</td>
								<td className="td-data">{e.user_id.lastName}</td>
							</tr>
						);
					})}
				</table>
			</div>
			{done && (
				<div className="listStudent-Container margin-bottom">
					<h2 className="listStudent-title mg-top">Match Estudiante Mentor</h2>
					<table>
						<tr className="listStudent-tr">
							<th className="listStudent-th"> </th>
							<th className="listStudent-th">Estudiante</th>
							<th className="listStudent-th">Mentor</th>
						</tr>

						{match.map((e, index) => {
							return (
								<tr className="listStudent-tr-map" key={e.id}>
									<td className="td-number">{index + 1}</td>
									<td className="td-data">{e.nameEstudent}</td>
									<td className="td-data">{e.nameMentor}</td>
								</tr>
							);
						})}
					</table>
				</div>
			)}
			<button style={{ display: done ? 'none' : 'block' }} onClick={calculateMatch}>
				Hacer Match
			</button>
		</div>
	);
}
