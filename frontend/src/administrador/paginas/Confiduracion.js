import React, { useState, useEffect, useRef, Fragment } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { LugarAtencionServicio } from "../servicios/LugarAtencionServicio";
import { AreaService } from "../servicios/AreaService";
const Configuraciones = () => {
  const [horaInicioAtencion, establecerHoraInicioAtencion] = useState(null);
  const [horaFinAtencion, establecerHoraFinAtencion] = useState(null);
  const [horaInicioReceso, establecerHoraInicioReceso] = useState(null);
  const [horaFinReceso, establecerHoraFinReceso] = useState(null);
  const [horaInicioAtencionFinSemana, establecerHoraInicioAtencionFinSemana] =
    useState(null);
  const [horaFinAtencionFinSemana, establecerHoraFinAtencionFinSemana] =
    useState(null);
  const [lugaresAtencion, establecerLugaresAtencion] =useState([]);
  const [areas, establecerAreas] = useState([]);
  const [valorLugar, establecerValorLugar] = useState([]);
  const [valorArea, establecerValorArea] = useState([]);
  const lugarAtencionServicio = new LugarAtencionServicio();
  const areaService = new AreaService();
  

  useEffect(() => {

    areaService.getAreas().then((data) => {
      console.log(data);
      establecerAreas(data);
    })

    lugarAtencionServicio.obtenerLugarAtencion().then((data) => {
      console.log("data", data);
      establecerLugaresAtencion(data);
    });

  }, []);

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
                    placeholder="Seleccione el lugar de atencion"
                    required
                    emptyMessage="No se encontraron lugares de atención"
                    options={lugaresAtencion}
                    value={valorLugar}
                    onChange={(e) => {
                      console.log(e.value)
                      establecerValorLugar(e.value)
                    }}
                    optionLabel="Nombre"
                    label="Nombre"
                  ></Dropdown>
            </div>
            <div className="field">
              <label htmlFor="horaInicioAtencion">
                Hora de inicio de Atencion
              </label>
              <Calendar showTime timeOnly hourFormat="12" value={horaInicioAtencion} onChange={(e) => {
                console.log(new Date(e.value).getHours()+':'+new Date(e.value).getMinutes()+':'+ new Date(e.value).getSeconds())
                establecerHoraInicioAtencion(e.value)}}></Calendar>
              {/* <Calendar
                timeOnly
                showTime
                hourFormat="24"
                value={valorLugar ? valorLugar.HoraInicioAtencion : null}
                onChange={(e) => { 
                  console.log(e.value)
                  establecerHoraInicioAtencion(e.value)}}
              ></Calendar> */}
            </div>
            <div className="field">
              <label htmlFor="horaFinAtencion">Hora de fin de Atencion</label>
              <Calendar
                showTime timeOnly hourFormat="12"
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
                showTime timeOnly hourFormat="12"
                value={horaInicioReceso}
                onChange={(e) => establecerHoraInicioReceso(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaFinReceso">Hora de fin de Receso</label>
              <Calendar
                showTime timeOnly hourFormat="12"
                value={horaFinReceso}
                onChange={(e) => establecerHoraFinReceso(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaInicioAtencionFinSemana">
                Hora de inicio de atencion de fin de semana
              </label>
              <Calendar
                showTime timeOnly hourFormat="12"
                value={horaInicioAtencionFinSemana}
                onChange={(e) => establecerHoraInicioAtencionFinSemana(e.value)}
              ></Calendar>
            </div>
            <div className="field">
              <label htmlFor="horaFinAtencionFinSemana">
                Hora de finalizacion de atencion de fin de semana
              </label>
              <Calendar
                showTime timeOnly hourFormat="12"
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
          <Dropdown
                    id="lugarAtencion"
                    placeholder="Seleccione el Area"
                    required
                    emptyMessage="No se encontraron Areas"
                    options={areas}
                    value={valorArea}
                    onChange={(e) => {
                      console.log(e.value)
                      establecerValorArea(e.value)
                    }}
                    optionLabel="Nombre"
                    label="Nombre"
                  ></Dropdown>
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
