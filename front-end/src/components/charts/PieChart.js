import React,{useState, useEffect} from 'react';
import { 
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2'
import 'chartjs-plugin-labels';

ChartJS.register(
	CategoryScale,
	LinearScale,
	ArcElement,
	Title,
	Tooltip,
	Legend
);


export default function PieChart(props){
	const labelList = []
	const colorList = []
	const dataList = []
	const setLabel = props.setLabel

	const label = props.label.map((lab)=>{		
		labelList.push(lab);
	})

	const data = props.data.map((dat)=>{
		dataList.push(dat);
	})

	const color = props.color.map((col)=>{
		colorList.push(col);
	})

	return(
		<Pie
			data={{
				labels: [...labelList],
				datasets:[{
					label:`${setLabel}`,
					data: [...dataList],
					backgroundColor:[...colorList],
				}],
				hoverOffSet: 4
			}}
			height={props.height}
			width={props.width}
			options={{
				maintainAspectRatio: false,
				plugins:{
					legend:{
						position: 'right'
					}
				}
			}}
		/>
	)
}