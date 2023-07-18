import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  loader: boolean = true;
  gastos: any[] = [];
  gastosM: any[] = [];
  mes!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getGastos().subscribe((data) => {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth();
      const mesesEnEspañol = [
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
      const nombreMesActual = mesesEnEspañol[mesActual];
      this.mes = nombreMesActual;
      this.gastos = data;
      this.gastosM = this.gastos.filter((gasto) => {
        const fechaGasto = new Date(gasto.fechaLiquidacion);
        const mesGasto = fechaGasto.getMonth();
        return mesGasto === mesActual;
      });
      this.loader = false;
      console.log(this.gastos);
    });
  }
  
  exportPDF() {
    const doc = new jsPDF('l');
    // Agregar imagen
    doc.addImage(
      '../../../assets/superior_logo.png',
      'PNG',
      239,
      0,
      60,
      30
    );
    // Configurar tamaño de fuente
    doc.setFontSize(22);
    // Agregar texto
    doc.text('Texto de Tamaño Grande', 15, 25);

    // Divide el texto en líneas
    const textoLargo = 'El poder del amor es inmenso y transformador. Es un sentimiento capaz de derribar barreras, sanar heridas y unir a las personas en un vínculo profundo y significativo. El amor tiene la capacidad de irradiar luz en los momentos más oscuros y calmar las tormentas internas que enfrentamos.'
    const textoDividido = doc.splitTextToSize(textoLargo, 480); // 500 es el ancho máximo

    // Cambiar tamaño de fuente
    doc.setFontSize(12);
    // Agregar más texto
    doc.text(
      textoDividido,
      15,
      40
    );

    let data = [];

    const formatNumber = (num: number) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };

    const formatDate = (date: Date) => {
      let day = ('0' + date.getDate()).slice(-2);
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    for (let gasto of this.gastos) {
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
      startY: 60,
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
      styles: {
        fontSize: 9,
        cellPadding: 1,
        lineColor: [44, 62, 80],
        lineWidth: 0.15,
      }, // estilos globales
      columnStyles: {
        0: { cellWidth: 'auto', halign: 'center' }, // centrar las celdas de la primera columna
      },
      headStyles: { fillColor: [0, 41, 48], valign: 'middle' },
      theme: 'grid', // estilo de la tabla
    });

    doc.save('resumenLegalizaciones.pdf');
  }
}
