import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import { Toolbar } from "primereact/toolbar";
import { ServicioProducto } from "../servicios/ServicioProducto";
import { Dropdown } from "primereact/dropdown";

const datosLinea = {
  labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  datasets: [
    {
      label: 'Hoy',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 43, 70, 89],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: .4
    },
    {
      label: 'Ayer',
      data: [28, 48, 40, 19, 86, 27, 90, 15, 30, 56, 67], // Aqui hay que cargar los tiquets atendidos por hora segun la hora del dia
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: .4
    }
  ]
};

const Panel = (props) => {
  const [products, establecerProductos] = useState(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [opcionesLinea, setOpcionesLinea] = useState(null)

  const temaClaro = () => {
    const opcionesLinea = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef',
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef',
          }
        },
      }
    };

    setOpcionesLinea(opcionesLinea)
  }

  useEffect(() => {
    const servicioProducto = new ServicioProducto();
    servicioProducto
      .getProductsSmall()
      .then((dato) => establecerProductos(dato));
    temaClaro();
  }, []);

  const valoresDropdown = [
    { nombre: "Tiquipaya", codigo: "1" },
    { nombre: "America", codigo: "0" },
    { nombre: "Ayacucho", codigo: "2" },
    { nombre: "Todos", codigo: "3" },
  ];

  const [valorDropdown, establecerValorDropdown] = useState(null);

  const baseToolbarIzquierda = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Dropdown
            value={valorDropdown}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdown}
            optionLabel="nombre"
            placeholder="Seleccione el campus"
          />
        </div>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Toolbar className="mb-4" left={baseToolbarIzquierda}></Toolbar>
      <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Tickets generados - Hoy
                </span>
                <div className="text-900 font-medium text-xl">152</div>{" "}
                {/* Cargamos la cantidad de tiquets generados hasta el momento del dia*/}
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-ticket text-blue-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">24 </span>{" "}
            {/* Cargamos la cantidad de tiquets atendidos en el dia*/}
            <span className="text-500">tickets atendidos</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Tickets no atendidos
                </span>
                <div className="text-900 font-medium text-xl">28</div>{" "}
                {/* Cargamos la cantidad de tiquets no atendidos*/}
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-inbox text-cyan-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">- 4% </span>{" "}
            {/* Cargamos la diferencia del porcentaje con respecto de ayer - cambiar el simbolo + por - si corresponde*/}
            <span className="text-500">respecto de ayer</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Tickets traspasados - Hoy
                </span>
                <div className="text-900 font-medium text-xl">48</div>{" "}
                {/* Cargamos la cantidad de tiquets traspasados hoy*/}
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-map-marker text-orange-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium"> + %52 </span>{" "}
            {/* Cargamos la diferencia del porcentaje con respecto de ayer - cambiar el simbolo + por - si corresponde*/}
            <span className="text-500">respecto de ayer</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Quejas realizadas - Hoy{" "}
                </span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-red-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-comment text-red-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-500">Resueltas</span>
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <div className="flex justify-content-between align-items-center mb-5">
              <h5>Lugares de atención</h5>
            </div>
            <ul className="list-none p-0 m-0">
              {/* LLENAR CON DATOS EN CICLO */}
              {/* Para que cada barra de progreso sea de diferente color podria definirse un array con los colores 
                  y segun el ciclo avance se puede dar el color segun la posicion del array EXAMPLE
                  
                  const colores: ['orange','purple']
                  for(i=0; i < 10< i++) {
                    <span className="text-{{i}}-500 ml-3 font-medium">%50</span> no estoy seguro de si esta bien concatenado de esa forma xdxd
                  }
                  */}
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Space T-Shirt
                  </span>
                  <div className="mt-1 text-600">Clothing</div>
                </div>
                <div className="mt-2 md:mt-0 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-orange-500 h-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                  <span className="text-orange-500 ml-3 font-medium">%50</span>
                </div>
              </li>
              {/* FIN DEL CICLO */}

              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Portal Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-cyan-500 h-full"
                      style={{ width: "16%" }}
                    />
                  </div>
                  <span className="text-cyan-500 ml-3 font-medium">%16</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Supernova Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <span className="text-pink-500 ml-3 font-medium">%67</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Wonders Notebook
                  </span>
                  <div className="mt-1 text-600">Office</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <span className="text-green-500 ml-3 font-medium">%35</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Mat Black Case
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-purple-500 h-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <span className="text-purple-500 ml-3 font-medium">%75</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Robots T-Shirt
                  </span>
                  <div className="mt-1 text-600">Clothing</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-teal-500 h-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <span className="text-teal-500 ml-3 font-medium">%40</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <h5>Tickets atendidos</h5>
            <Chart type="line" data={datosLinea} options={opcionesLinea} />
          </div>
        </div>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return (
    prevProps.location.pathname === nextProps.location.pathname &&
    prevProps.colorMode === nextProps.colorMode
  );
};
export default React.memo(Panel, comparisonFn);