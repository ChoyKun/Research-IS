import React,{useState, useEffect} from 'react';
import { 
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);


export default function BarChart(props){
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
		<Bar
			data={{
				labels: [...labelList],
				datasets:[{
					label:`${setLabel}`,
					data: [...dataList],
					backgroundColor:[...colorList],
				}]
			}}
			height={props.height}
			width={props.width}
			options={{
				maintainAspectRatio: false,
				scale: {
					ticks:{
						precision: 0
					}
				}
			}}
		/>
	)
}