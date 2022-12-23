import { useState } from "react";
import './Sample_Submission.css';

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS , CategoryScale , LinearScale,BarElement,Title,Tooltip, } from "chart.js";

ChartJS.register ( CategoryScale , LinearScale , BarElement , Title , Tooltip );

export default function App() {
  const [ data3, setData ] = useState([]);
  const [ table,setTable ] = useState();
  const [ negative, setNegative ] = useState();
  const [ none, setNone ] = useState();
  const [ study, setStudy ] = useState();
  const [ image, setImage ] = useState();
    
  const [ first, setFirst ] = useState();
  const [ second, setSecond ] = useState();
  const [ third, setThird ] = useState();
  const [ fourth, setFourth ] = useState();
  const [ fifth, setFifth ] = useState();

  const [ select,setSelect ] = useState();

  let bar = null;
  const labels = ["Negative" , "None" , "Study" , "Image" , "1" , "0" , "0" , "1" , "1"];
  const options = {
    indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: 'right',
        },
      }
    }

  function get_data() {
  fetch('http://localhost:5000/')
  .then(response => response.json())
  .then(data => setData(data))
  
  const table = data3.map((item) => (
    <tr>
      <td> {item.id} </td>
      <td> {item.PredictionString} </td>
    </tr>
    ));
    setTable(table);
    
  const csv_predict = data3.map((item) => (
    item.PredictionString
  ));
    
  const csv_id = data3.map((item) => (
    item.id
  ));

  const csv_id_split = csv_id.map((item) => (
    item.split("_")
  ));

  let count_study = 0;
  let count_image = 0;
  let count_negative = 0;
  let count_none = 0;
  let First = 0;
  let Second = 0;
  let Third = 0;
  let Fourth = 0;
  let Fifth = 0;

  for (let i = 0; i < csv_predict.length; i++) {
    if (csv_predict[i].includes("negative")) {
      count_negative++;
    }
    setNegative(count_negative);

    if (csv_predict[i].includes("none")) {
      count_none++;
    }
    setNone(count_none);
  }

  // Count Study , Image
  for (let i = 0; i < csv_id_split.length; i++) {
    if (csv_id_split[i][1] == "study") {
      count_study++;
    }
    setStudy(count_study);
    if (csv_id_split[i][1] == "image") {
      count_image++;
    }
    setImage(count_image);
  }
    
  //Split " "
  const csv_predict_split = csv_predict.map((item) => (
    item.split(" ")
    ) );

  //Slice 0
    
  for (let i=0; i<csv_predict_split.length; i++) {
    if (csv_predict_split[i][1] === "1") {
      First++;
    }
     
    if (csv_predict_split[i][2] === "0") {
      Second++;
    }
  
    if (csv_predict_split[i][3] === "0") {
      Third++;
    }

    if (csv_predict_split[i][4] === "1") {
      Fourth++;
    }
    
    if (csv_predict_split[i][5] === "1") {
      Fifth++;
    }
  }

  setFirst(String(First));
  setSecond(String(Second));
  setThird(String(Third));
  setFourth(String(Fourth));
  setFifth(String(Fifth));

  setSelect("sample");
}

const data = {
  labels,
  datasets: [
    {
      label: [ "negative" , "none" , "study" , "image" , "1" , "0" , "0" , "1" , "1" ],
      data: [ negative , none , study , image , first , second , third , fourth , fifth ],
      backgroundColor: ["rgba(255,204,255)" , "rgba(224,224,224)" , "rgba(153,255,153)" , "rgba(204,255,255)" , "rgba(204,204,255)" , "rgba(102,255,255)" , "rgba(255,178,102)" , "rgba(255,255,102)" , "rgba(255,153,153)" ],
    },
  ],
};

const graph = null

if(select === 'sample') {
  bar = <Bar data={data}/>
}

return <div className="container-sm">
  <button onClick={get_data} className="Button"> Sample Submission </button>
  
  <div className="container csv">
    <table className="table">
      {table}
    </table> 
  </div>

  <div className="Bar">
    {bar}
  </div>
</div>;
}