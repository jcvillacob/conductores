import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  datosPersonales: any = {};
  loader: boolean = true;
  gastos: any[] = [];
  gastosM: any[] = [];
  gastosP: any[] = [];
  mes!: string;
  mesActual!: number;
  anoActual!: number;
  modalB: boolean = false;
  paraPDF: number = -1;
  mesesEnEspanol = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  constructor(private dataService: DataService, private loginService: LoginService) {
    const fechaActual = new Date();
    this.mesActual = fechaActual.getMonth();
    this.anoActual = fechaActual.getFullYear();
  }

  ngOnInit(): void {
    this.datosPersonales = this.loginService.getDatos();
    this.dataService.getGastos().subscribe((data) => {
      const nombreMesActual = this.mesesEnEspanol[this.mesActual];
      this.mes = nombreMesActual;
      this.gastos = data;
      this.gastosM = this.gastos.filter((gasto) => {
        const fechaGasto = new Date(gasto.fechaLiquidacion);
        const mesGasto = fechaGasto.getMonth();
        return mesGasto === this.mesActual;
      });
      this.loader = false;
    });
  }

  modal() {
    this.modalB = !this.modalB;
  }

  selectedMonth() {
    if (this.paraPDF != -1) {
      this.paraPDF = Number(this.paraPDF);
      this.gastosP = this.gastos.filter((gasto) => {
        const fechaGasto = new Date(gasto.fechaLiquidacion);
        const mesGasto = fechaGasto.getMonth();
        return mesGasto === this.paraPDF;
      });
    } else {
      this.gastosP = [];
    }
  }

  exportPDF() {
    if (this.paraPDF != -1) {
      const doc = new jsPDF('l');
      // Agregar imagen
      doc.addImage('../../../assets/PlantillaPDF/superior_logo.png', 'PNG', 239, 0, 60, 30);
      doc.addImage('../../../assets/PlantillaPDF/inferior_logo.png', 'PNG', 249, 170, 60, 60);
      doc.addImage('../../../assets/PlantillaPDF/nit.png', 'PNG', 1, 110, 7, 42);

      const formatNumber = (num: number) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      };

      const formatDate = (date: Date) => {
        let day = ('0' + date.getDate()).slice(-2);
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      // Configurar tamaño de fuente
      doc.setFontSize(22);
      doc.text('CERTIFICADO DE LEGALIZACIONES', 25, 45);
      doc.setFontSize(18);
      doc.text(formatDate(new Date()), 225, 45);

      // Divide el texto en líneas
      const textoLargo = `Por medio de la presente hacemos constar que el señor ${this.datosPersonales.nombre} con cédula de Ciudadanía número ${this.datosPersonales.cedula} realizó en el mes de ${this.mesesEnEspanol[this.paraPDF]} de ${this.anoActual} las siguientes legalizaciones de anticipos:`;
      const textoDividido = doc.splitTextToSize(textoLargo, 370);
      // Cambiar tamaño de fuente
      doc.setFontSize(12);
      // Agregar más texto
      doc.text(textoDividido, 30, 60);
      doc.text("Cordialmente,", 30, 200);

      let data = [];

      for (let gasto of this.gastosP) {
        data.push([
          gasto.manifiesto,
          gasto.ruta,
          gasto.placa,
          formatNumber(gasto.vrAnticipo),
          formatNumber(gasto.vrGasto),
          formatNumber(gasto.vrBonificacion),
          formatNumber(gasto.vrAlcance),
          formatNumber(gasto.bonI_40),
          formatNumber(gasto.rentA_60),
          formatDate(new Date(gasto.fechaManifiesto)),
          formatDate(new Date(gasto.fechaLiquidacion)),
        ]);
      }

      autoTable(doc, {
        startY: 75,
        head: [
          [
            'Manifiesto',
            'Ruta',
            'Placa',
            'Valor Anticipo',
            'Valor Gasto',
            'Valor Bonificación',
            'Valor Alcance',
            'Bonificación (40%)',
            'Renta (60%)',
            'Fecha Manifiesto',
            'Fecha Liquidación',
          ],
        ],
        body: data,
        styles: { fontSize: 9, cellPadding: 1, lineColor: [44, 62, 80], lineWidth: 0.15 },
        columnStyles: {
          0: { cellWidth: 'auto', halign: 'center' },
        },
        headStyles: { fillColor: [0, 41, 48], valign: 'middle' },
        theme: 'grid',
      });

      doc.save('resumenLegalizaciones.pdf');
    }
  }
}
