import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent {

  data: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: this.getSubs(),
        label: 'Subscriptions',
        backgroundColor:['rgb(255,99,132)','rgb(54,162,235)']
      },
      {
        data: this.getwatchtimes(), // Corrected to actually use this method
        label: 'Watch Times',
        backgroundColor:['rgb(255,99,132)','rgb(54,162,235)']
      }
    ]
  };

  data1: ChartData<'line'> = {
    labels: this.getLabels(),
    datasets: [
      {
        data: this.getViews(),
        label: 'Views',
        backgroundColor:['rgb(255,99,132)','rgb(54,162,235)']
      },
      {
        data: this.getwatchtimes(),
        label: 'Watch Times',
        backgroundColor:['rgb(255,99,132)','rgb(54,162,235)'] // Provided a label
      }
    ]
  };

  getSubs(): number[] {
    return [100, 200, 300, 250, 450, 150, 200, 550, 350, 200, 300, 400];
  }

  getwatchtimes(): number[] {
    return [100, 300, 100, 280, 430, 180, 290, 550, 380, 280, 390, 300];
  }

  getLabels(): string[] {
    let labels: string[] = [];
    for (let i = 0; i < 31; i++) {
      labels.push((i + 1).toString() + ' Dec');
    }
    return labels;
  }

  getViews(): number[] {
    let data: number[] = [];
    for (let i = 0; i < 31; i++) {
      data.push(Math.floor(Math.random() * 10000)); // Use floor to get whole numbers
    }
    return data;
  }

genderChartData:ChartData<'pie'> = {
  labels:['Male','Female'],
  datasets:[
    {
      data:[75 ,25],
      borderWidth:0,
      backgroundColor:['rgb(255,99,132)','rgb(54,162,235)']
    },
  ]
}


geoChartData:ChartData<'doughnut'> ={
  labels:['India','Pakistan','Nepal','Bangladesh','United states'],
  datasets:[
    {
    data:[80,10,5,2,3],
    borderWidth:0,
    backgroundColor:['rgb(255,99,132)','rgb(54,162,235)']
    },
  ]
}



}
