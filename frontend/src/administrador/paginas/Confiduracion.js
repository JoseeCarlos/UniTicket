import React, { useState, useEffect, useRef, Fragment } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
const Configuraciones = () => {
  const [horaInicioAtencion, establecerHoraInicioAtencion] = useState(null);
  const [horaFinAtencion, establecerHoraFinAtencion] = useState(null);
  const [horaInicioReceso, establecerHoraInicioReceso] = useState(null);
  const [horaFinReceso, establecerHoraFinReceso] = useState(null);
  const [horaInicioAtencionFinSemana, establecerHoraInicioAtencionFinSemana] =
    useState(null);
  const [horaFinAtencionFinSemana, establecerHoraFinAtencionFinSemana] =
    useState(null);
  const pieLugarAtencion = (
    <div className="flex flex-end">
      <span className="p-buttonset">
        <Button icon="pi pi-check" label="Guardar" />
        <Button icon="pi pi-times" label="Cancelar" />
      </span>
    </div>
  );
  const pieArea = (
    <div className="flex flex-end">
      <span className="p-buttonset">
        <Button icon="pi pi-check" label="Guardar" />
        <Button icon="pi pi-times" label="Cancelar" />
      </span>
    </div>
  );
  return (
    <React.Fragment>
      <Card
        title="Configuracion de Lugar de Atencion"
        footer={pieLugarAtencion}
      >
        <div className="flex flex-column md:flex-row">
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="lugarAtencion">Lugar de Atencion</label>
              <Dropdown
                id="lugarAtencion"
                emptyMessage="No se encontraron lugares de atencion"
              />
            </div>
            <div className="field">
              <label htmlFor="horaInicioAtencion">
                Hora de inicio de Atencion
              </label>
              <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={horaInicioAtencion}
                onChange={(e) => establecerHoraInicioAtencion(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaFinAtencion">Hora de fin de Atencion</label>
              <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={horaFinAtencion}
                onChange={(e) => establecerHoraFinAtencion(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="maximoReservasPorEstudiante">
                Numero maximo de reservas por estudiante
              </label>
              <InputNumber mode="decimal" useGrouping={false} />
            </div>
          </div>
          <Divider layout="vertical" />
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="horaInicioReceso">Hora de inicio de Receso</label>
              <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={horaInicioReceso}
                onChange={(e) => establecerHoraInicioReceso(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaFinReceso">Hora de fin de Receso</label>
              <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={horaFinReceso}
                onChange={(e) => establecerHoraFinReceso(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaInicioAtencionFinSemana">
                Hora de inicio de atencion de fin de semana
              </label>
              <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={horaInicioAtencionFinSemana}
                onChange={(e) => establecerHoraInicioAtencionFinSemana(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaFinAtencionFinSemana">
                Hora de finalizacion de atencion de fin de semana
              </label>
              <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={horaFinAtencionFinSemana}
                onChange={(e) => establecerHoraFinAtencionFinSemana(e.value)}
              ></Calendar>
            </div>
          </div>
        </div>
      </Card>
      <br />
      <Card title="Configuracion de Area" footer={pieArea} className="p-fluid">
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown id="area" emptyMessage="No se encontraron areas" />
        </div>
        <div className="field">
          <label htmlFor="maximoReservasPorHora">
            Numero maximo de reservas por hora
          </label>
          <InputNumber mode="decimal" useGrouping={false} />
        </div>
      </Card>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Configuraciones, comparisonFn);
