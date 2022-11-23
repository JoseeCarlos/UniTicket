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
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { ListBox } from 'primereact/listbox';

const Configuraciones = () => {
  const [horaInicioAtencion, establecerHoraInicioAtencion] = useState(null);
  const [horaFinAtencion, establecerHoraFinAtencion] = useState(null);
  const [horaInicioReceso, establecerHoraInicioReceso] = useState(null);
  const [horaFinReceso, establecerHoraFinReceso] = useState(null);
  const [horaInicioAtencionFinSemana, establecerHoraInicioAtencionFinSemana] =
    useState(null);
  const [horaFinAtencionFinSemana, establecerHoraFinAtencionFinSemana] =
    useState(null);
  const [lugaresAtencion, establecerLugaresAtencion] = useState([]);
  const [areas, establecerAreas] = useState([]);
  const [sedes, establecerSedes] = useState([]);
  const [valorLugar, establecerValorLugar] = useState([]);
  const [valorArea, establecerValorArea] = useState([]);
  const [valorSede, establecerValorSede] = useState([]);
  const [valorLeyenda, establecerLeyenda] = useState('');
  const [sedeNacional, establecerSedeNacional] = useState('1');
  const [videoSedeNacional, establecerVideoSedeNacional] = useState('1');
  const [video, establecerVideo] = useState(null);
  const [videoSeleccionado, establecerVideoSeleccionado] = useState(null);

  const lugarAtencionServicio = new LugarAtencionServicio();
  const areaService = new AreaService();
  const videos = [
    { enlace: 'yuyusdjfksdf' },
    { enlace: 'yuyusdjsdffksdf' },
    { enlace: 'yuyusdjsdffksdf' },
    { enlace: 'yuyusdjsdffksdf' },
    { enlace: 'yuyusdjfksdfdf' }
  ];

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
        title="Configuración de Lugar de Atencion"
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
                console.log(new Date(e.value).getHours() + ':' + new Date(e.value).getMinutes() + ':' + new Date(e.value).getSeconds())
                establecerHoraInicioAtencion(e.value)
              }}></Calendar>
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
      <Card title="Configuración de Área" footer={pieArea} className="p-fluid">
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
      <br />
      <Card title="Configuración - Vista de atención de los tickets" footer={pieArea} className="p-fluid">
        <div className="flex flex-row">
          <div className="field col-2">
            <div className="field-radiobutton">
              <RadioButton inputId="sede" name="sede" value="1" onChange={(e) => establecerSedeNacional(e.value)} checked={sedeNacional === '1'} />
              <label htmlFor="sede">Leyenda por Sede</label>
            </div>
          </div>
          <div className="field col-2">
            <div className="field-radiobutton">
              <RadioButton inputId="nacional" name="nacional" value="0" onChange={(e) => establecerSedeNacional(e.value)} checked={sedeNacional === '0'} />
              <label htmlFor="nacional">Leyenda Nacional</label>
            </div>
          </div>
        </div>

        {
          sedeNacional === '1' &&
          <div className="field">
            <label htmlFor="sede">Sede Académica</label>
            <Dropdown
              id="sedeAcademica"
              placeholder="Seleccione la Sede Académica"
              required
              emptyMessage="No se encontraron sedes"
              options={sedes}
              value={valorSede}
              onChange={(e) => {
                console.log(e.value)
                establecerValorArea(e.value)
              }}
              optionLabel="Nombre"
              label="Nombre"
            ></Dropdown>
          </div>
        }

        <div className="field">
          <label htmlFor="leyenda">
            Leyenda para la vista de atención
          </label>

          <InputTextarea value={valorLeyenda} onChange={(e) => establecerLeyenda(e.target.value)} rows={3} cols={30} autoResize />
        </div>
      </Card>

      <br />

      <Card title="Configuración - Video para la vista de atención" footer={pieArea}>
        <div className="flex flex-column md:flex-row">
          <div className="p-fluid col-6">
            <div className="flex flex-row">
              <div className="field col-6">
                <div className="field-radiobutton">
                  <RadioButton inputId="sede" name="sede" value="1" onChange={(e) => establecerVideoSedeNacional(e.value)} checked={videoSedeNacional === '1'} />
                  <label htmlFor="sede">Video por Sede</label>
                </div>
              </div>
              <div className="field col-6">
                <div className="field-radiobutton">
                  <RadioButton inputId="nacional" name="nacional" value="0" onChange={(e) => establecerVideoSedeNacional(e.value)} checked={videoSedeNacional === '0'} />
                  <label htmlFor="nacional">Video Nacional</label>
                </div>
              </div>
            </div>

            {
              videoSedeNacional === '1' &&
              <div className="field">
                <label htmlFor="sede">Sede Académica</label>
                <Dropdown
                  id="sedeAcademica"
                  placeholder="Seleccione la Sede Académica"
                  required
                  emptyMessage="No se encontraron sedes"
                  options={sedes}
                  value={valorSede}
                  onChange={(e) => {
                    console.log(e.value)
                    establecerValorArea(e.value)
                  }}
                  optionLabel="Nombre"
                  label="Nombre"
                ></Dropdown>
              </div>
            }

            <div className="field">
              <label htmlFor="video">
                Video para la vista de atención (Ingresar un link de YouTube)
              </label>
              <InputText value={video} onChange={(e) => establecerVideo(e.target.value)} />
            </div>
          </div>

          <Divider layout="vertical" />

          <div className="p-fluid col-6">
            <div className="field">
algo
            </div>

            <div className="field">
              <ListBox value={videoSeleccionado} options={videos} onChange={(e) => establecerVideoSeleccionado(e.value)} optionLabel="listaVideos" style={{ width: '94%' }} />
            </div>
          </div>
        </div>
      </Card>
      <br />
    </React.Fragment >
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Configuraciones, comparisonFn);
