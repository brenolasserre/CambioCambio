import { useEffect, useState } from "react";

import React from 'react';

interface DolarItem {
  nombre: string;
  casa: string;
  compra: string;
  venta: string;
  fechaActualizacion: string;
}

interface VariacionItem {
  casa: string;
  venta: number;
}

const Dolares: React.FC = () => {
  const [dolar, setDolar] = useState<DolarItem[]>([]);
  const [variacion, setVariacion] = useState<VariacionItem[]>([]);



  
  //   Fetch DolarApi para obtener Compra y Venta
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares");
        if (!response.ok) {
          throw new Error(
            "Error al obtener los datos de la API de DolarApi. " +
              response.status
          );
        }
        const data = await response.json();
        setDolar(data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  //   Fetch ArgentinaDatos para obtener la variacion
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 2);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    async function getVariacion(date: string) {
      try {
        const formattedDate = date.replace(/-/g, "/");
        const response = await fetch(
          `https://api.argentinadatos.com/v1/cotizaciones/dolares/${formattedDate}`
        );
        if (!response.ok) {
          throw new Error(
            "Error al obtener los datos de la API de DolarApi. " +
              response.status
          );
        }
        const data = await response.json();
        setVariacion(data);
      } catch (error) {
        console.error(error);
      }
    }
    getVariacion(formattedDate);
  }, []);

  // Funcion para calcular tiempo transcurrido
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const utcOffsetMinutes = now.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - utcOffsetMinutes * 60 * 1000);
    // Use getTime() to ensure TypeScript recognizes these as numbers
    const diffSeconds = Math.round((now.getTime() - adjustedDate.getTime()) / 1000);
    if (diffSeconds <= 1) return "hace unos segundos";
    else if (diffSeconds < 60) return `hace ${diffSeconds} segundos`;
    else if (diffSeconds < 120) return "hace un minuto";
    else if (diffSeconds < 3600) return `hace ${Math.floor(diffSeconds / 60)} minutos`;
    else if (diffSeconds < 7200) return "hace una hora";
    else if (diffSeconds < 86400) return `hace ${Math.floor(diffSeconds / 3600)} horas`;
    else if (diffSeconds < 172800) return "ayer";
    else return `hace ${Math.floor(diffSeconds / 86400)} días`;
  };

  const getVentaValue = (currencySymbol: string): number => {
    const currency = dolar.find(
      (d) =>
        d.nombre === currencySymbol ||
        d.nombre === currencySymbol + " MEP" ||
        d.nombre === currencySymbol + " CCL"
    );
    // Ensure the venta value is parsed as a number and provide a default value of 0 if necessary
    return currency ? parseFloat(currency.venta) : 0;
  };

  return (
    <div className="mx-8">
      <h1 className="text-3xl font-extrabold text-[#E5ECFF] mt-12 ">Dolar</h1>
      <section className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4 mt-12 mx-auto">
        {/* Sacar el Dolar Mayorista */}
        {dolar
          .filter((_, index) => index !== 4)
          .map((item) => {
            let variationClass = "";
            let valoresClass = "";
            const variationValue = parseFloat(
              (
                (
                  getVentaValue(item.nombre) /
                  (variacion.find(
                    (v) => v.casa === item.casa.toLowerCase().split(" ")[0]
                  )?.venta ?? 0) 
                  - 1
                ) * 100
              ).toFixed(2)
            );
            if (variationValue > 0) {
              variationClass = "text-successColor bg-successBackground";
              valoresClass = "text-successColor";
            } else if (variationValue < 0) {
              variationClass = "text-warningColor bg-warningBackground";
              valoresClass = "text-warningColor";
            } else {
              variationClass = "text-textColor  bg-textColorBackground";
              valoresClass = "text-textColor";
            }

            return (
              <div
                key={item.casa}
                className="bg-[#0C1324] text-[#D7FFF3] w-full lg:w-1/4 px-8 py-6 rounded-[15px] flex flex-col gap-4"
              >
                <div className="text-[#E5ECFF] text-[20px] font-bold flex justify-between items-center">
                  <div className="cambio">
                    Dolar &nbsp;
                    {item.nombre === "Contado con liquidación" ? (
                      <span>CCL</span>
                    ) : item.nombre === "Bolsa" ? (
                      <span>MEP</span>
                    ) : (
                      item.nombre
                    )}
                  </div>

                  <div
                    className={`relative ${variationClass} flex items-center justify-center gap-1 px-3 py-1 text-xs rounded-full`}
                  >
                    {variationValue !== null &&
                    variationValue !== undefined &&
                    variationValue > 0 ? (
                      <img
                        src="../../public/trendUp.svg"
                        alt="up"
                        className="h-4 w-4"
                      />
                    ) : variationValue < 0 ? (
                      <img
                        src="../../public/trendDown.svg"
                        alt="up"
                        className="h-4 w-4"
                      />
                    ) : (
                      ""
                    )}
                    <span>
                      {variationValue !== null && variationValue !== undefined
                        ? variationValue > 0
                          ? `+${variationValue.toFixed(2)} %`
                          : `${variationValue.toFixed(2)} %`
                        : ""}
                    </span>
                  </div>
                </div>

                <div className={`valores ${valoresClass}`}>
                  <p className="fuente m-0">
                    {parseFloat(item.compra).toFixed(2)}
                  </p>
                  <p className="fuente m-0">
                    {parseFloat(item.venta).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-textColorSecondary text-[12px] font-semibold">
                    {formatTimeAgo(item.fechaActualizacion)}
                  </p>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Dolares;