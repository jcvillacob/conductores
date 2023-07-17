import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-anticipos',
  templateUrl: './anticipos.component.html',
  styleUrls: ['./anticipos.component.css']
})
export class AnticiposComponent implements OnInit {
  anticipos: any[] = [];
  anticiposF: any[] = [];
  filtro: string = '';
  loader: boolean = true;
  c = 0;

  constructor (private dataService: DataService) {}

  ngOnInit(): void {
      this.dataService.getAnticiposGV().subscribe(data => {
        data.map(anticipo => {
          this.c++ ;
          if ((anticipo.detalleAnticipos).length > 1) {
            const datoNuevo = {manifiesto: anticipo.manifiesto, detalleAnticipos: [anticipo.detalleAnticipos[1]] }
            data.splice(this.c, 0, datoNuevo);
          }
        });
        this.anticipos = data;
        this.anticiposF = data;
        setTimeout (() => {
          this.loader = false;
        }, 1000)
        console.log(this.anticipos);
      })
  }

  cambioFiltro(filtro: string) {
    if (filtro === "Legalizado") {
      this.anticiposF = this.anticipos.filter(anticipo => anticipo.detalleAnticipos[0].saldo == 0);
    } else if (filtro === "Pendiente") {
      this.anticiposF = this.anticipos.filter(anticipo => anticipo.detalleAnticipos[0].saldo != 0 );
    } else {
      this.anticiposF = this.anticipos;
    }
  }
}
