import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
const Area = () => {
  let emptyArea = {
    areaId: null,
    name: "",
    description: "",
    status: "",
    createDate: "",
    updateDate: "",
    userIdCreate: "",
    userIdMod: "",
  };
  const [dataviewValue, setDataviewValue] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [area, setArea] = useState(emptyArea);
  const [areaInsertDialog, setAreaInsertDialog] = useState(false);
  const [areaViewDialog, setAreaViewDialog] = useState(false);
  const [areaEditDialog, setAreaEditDialog] = useState(false);
  const [areaDeleteDialog, setAreaDeleteDialog] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    // const campusService = new CampusService();
    // campusService.getCampuss().then(data => setDataviewValue(data) );
    setDataviewValue([
      {
        areaId: 1,
        name: "Cajas",
        description: "Atencion para pagos al a universidad",
        status: "Activo",
        createDate: "10/10/2022",
        updateDate: "12/10/2022",
        userCreate: "Juan Perez",
        userMod: "Jose Matinez",
      },
      {
        areaId: 2,
        name: "Bienestar Universitario",
        description: "Atencion para pagos al a universidad",
        status: "Activo",
        createDate: "10/10/2022",
        updateDate: "12/10/2022",
        userCreate: "Juan Perez",
        userMod: "Jose Matinez",
      },
      {
        areaId: 3,
        name: "Tramites",
        description: "Atencion para pagos al a universidad",
        status: "Activo",
        createDate: "10/10/2022",
        updateDate: "12/10/2022",
        userCreate: "Juan Perez",
        userMod: "Jose Matinez",
      },
      {
        areaId: 4,
        name: "Contabilidad",
        description: "Atencion para pagos al a universidad",
        status: "Activo",
        createDate: "10/10/2022",
        updateDate: "12/10/2022",
        userCreate: "Juan Perez",
        userMod: "Jose Matinez",
      },
      {
        areaId: 5,
        name: "Incripciones",
        description: "Atencion para pagos al a universidad",
        status: "Inactivo",
        createDate: "10/10/2022",
        updateDate: "12/10/2022",
        userCreate: "Juan Perez",
        userMod: "Jose Matinez",
      },
    ]);
  }, []);
  const viewArea = (area) => {
    setArea({ ...area });
    setAreaViewDialog(true);
  };
  const openAreaInsertDialog = () => {
    setArea(emptyArea);
    setAreaInsertDialog(true);
  };
  const editArea = (area) => {
    setArea({ ...area });
    setAreaEditDialog(true);
  };
  const deleteArea = (area) => {
    setArea({ ...area });
    setAreaDeleteDialog(true);
  };
  const hideAreaInsertDialog = () => {
    setSubmitted(false);
    setAreaInsertDialog(false);
  };
  const hideAreaViewDialog = () => {
    setSubmitted(false);
    setAreaViewDialog(false);
  };
  const hideAreaEditDialog = () => {
    setSubmitted(false);
    setAreaEditDialog(false);
  };
  const hideAreaDeleteDialog = () => {
    setSubmitted(false);
    setAreaDeleteDialog(false);
  };
  const saveArea = () => {};

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _area = { ...area };
    _area[`${name}`] = val;

    setArea(_area);
  };
  const areaInsertDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAreaInsertDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveArea}
      />
    </>
  );
  const areaViewDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAreaViewDialog}
      />
    </>
  );

  const deleteAttentionPlace = () => {};
  const areaDeleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAreaDeleteDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteAttentionPlace}
      />
    </>
  );
  const areaEditDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAreaEditDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveArea}
      />
    </>
  );
  const dataviewListItem = (data) => {
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column md:flex-row align-items-center p-3">
              <img
                src={`assets/demo/images/product/${data.image}`}
                alt={data.name}
                className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="font-bold text-2xl">{data.name}</div>
                <div className="mb-3">{data.description}</div>
                <div className="mb-3">{data.status}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button
                icon="pi pi-eye"
                onClick={() => {
                  viewArea(data);
                }}
              />
              <Button icon="pi pi-pencil" onClick={() => editArea(data)} />
              <Button icon="pi pi-trash" onClick={() => deleteArea(data)} />
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="card">
        <h5>
          Administración De Areas{" "}
          <i className="pi pi-plus icn" onClick={openAreaInsertDialog} />
        </h5>
        <DataView
          value={dataviewValue}
          layout={layout}
          paginator
          rows={9}
          sortOrder={sortOrder}
          sortField={sortField}
          itemTemplate={dataviewListItem}
        ></DataView>
      </div>
      <Dialog
        visible={areaInsertDialog}
        style={{ width: "450px" }}
        header="Nueva Area"
        modal
        className="p-fluid"
        footer={areaInsertDialogFooter}
        onHide={hideAreaInsertDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={area.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !area.name })}
          />
          {submitted && !area.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            value={area.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !area.name })}
          />
          {submitted && !area.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={areaInsertDialog}
        style={{ width: "450px" }}
        header="Nueva Area"
        modal
        className="p-fluid"
        footer={areaInsertDialogFooter}
        onHide={hideAreaInsertDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={area.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !area.name })}
          />
          {submitted && !area.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            value={area.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !area.name })}
          />
          {submitted && !area.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={areaViewDialog}
        style={{ width: "450px" }}
        header="Visualizar Area"
        modal
        className="p-fluid"
        footer={areaViewDialogFooter}
        onHide={hideAreaViewDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={area.name}
            onChange={(e) => onInputChange(e, "name")}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="description">Descripción</label>
          <InputText id="description" value={area.description} readOnly />
        </div>
        <div className="field">
          <label htmlFor="status">Estado</label>
          <InputText id="status" value={area.status} readOnly />
        </div>
        <div className="field">
          <label htmlFor="userCreate">Responsable de Registro</label>
          <InputText id="userCreate" value={area.userCreate} readOnly />
        </div>
        <div className="field">
          <label htmlFor="createDate">Fecha de Registro</label>
          <InputText id="createDate" value={area.createDate} readOnly />
        </div>
        <div className="field">
          <label htmlFor="updateDate">Fecha de Ultima Modificación</label>
          <InputText id="updateDate" value={area.updateDate} readOnly />
        </div>
        <div className="field">
          <label htmlFor="userMod">Responsable de Ultima Modificación</label>
          <InputText id="userMod" value={area.userMod} readOnly />
        </div>
      </Dialog>
      <Dialog
        visible={areaEditDialog}
        style={{ width: "450px" }}
        header="Editar Area"
        modal
        className="p-fluid"
        footer={areaEditDialogFooter}
        onHide={hideAreaEditDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={area.name}
            onChange={(e) => onInputChange(e, "name")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            value={area.description}
            onChange={(e) => onInputChange(e, "description")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="status">Estado</label>
          <InputText
            id="status"
            value={area.status}
            onChange={(e) => onInputChange(e, "status")}
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={areaDeleteDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={areaDeleteDialogFooter}
        onHide={hideAreaDeleteDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar el area <b>{area.name}</b>?
          </span>
        </div>
      </Dialog>
    </>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Area, comparisonFn);
