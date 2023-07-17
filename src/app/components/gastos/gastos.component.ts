import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
  loader: boolean = true;
  gastos: any[] = [];
  gastosM: any[] = [];
  mes!: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGastos().subscribe(data => {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth();
      const mesesEnEspañol = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
      const nombreMesActual = mesesEnEspañol[mesActual];
      this.mes = nombreMesActual;
      this.gastos = data;
      this.gastosM = this.gastos.filter(gasto => {
        const fechaGasto = new Date(gasto.fechaLiquidacion);
        const mesGasto = fechaGasto.getMonth();
        return mesGasto === mesActual;
      });
      setTimeout(() => {
        this.loader = false;
      }, 1000)
      console.log(this.gastos);
    })
  }
}
